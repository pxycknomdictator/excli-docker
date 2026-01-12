import { join } from "node:path";
import { generateFile } from "src/utils";
import { dbSections, envConfigs } from "src/config";
import type { Config, EnvConfig, GenerateFileArgs } from "src/types";

function getEnvVariables(config: Config): EnvConfig {
    const dockerEnvConfiguration = envConfigs[config.database];
    return dockerEnvConfiguration;
}

function formatEnvFile(config: Config): string {
    const { baseEnv, dockerEnv } = getEnvVariables(config);
    const lines: string[] = [];

    lines.push("# Database Connection");
    lines.push(`DATABASE_URL=${baseEnv.DATABASE_URL}`);
    lines.push("");

    const section = dbSections[config.database];

    lines.push(section.main);
    section.mainKeys.forEach((key) => {
        lines.push(`${key}=${dockerEnv[key]}`);
    });

    lines.push("");
    lines.push(section.admin);
    section.adminKeys.forEach((key) => {
        lines.push(`${key}=${dockerEnv[key]}`);
    });

    return lines.join("\n");
}

function formatEnvExampleFile(config: Config): string {
    const lines: string[] = [];

    lines.push("# Database Connection");
    lines.push("DATABASE_URL=");
    lines.push("");

    const section = dbSections[config.database];

    lines.push(section.main);
    section.mainKeys.forEach((key) => {
        lines.push(`${key}=`);
    });

    lines.push("");
    lines.push(section.admin);
    section.adminKeys.forEach((key) => {
        lines.push(`${key}=`);
    });

    return lines.join("\n");
}

export async function setupEnv(
    targetDir: string,
    config: Config,
): Promise<void> {
    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");

    const envContent = formatEnvFile(config);
    const envExampleContent = formatEnvExampleFile(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFile, fileContent: envContent },
        { fileLocation: envExampleFile, fileContent: envExampleContent },
    ];

    await Promise.all(
        dotenvs.map(async (env) => await generateFile({ ...env })),
    );
}
