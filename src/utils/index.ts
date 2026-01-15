import { writeFile, appendFile } from "node:fs/promises";
import { dbSections, envConfigs } from "src/config";
import type { Config, EnvConfig, GenerateFileArgs } from "src/types";

export async function generateFile(fileArgs: GenerateFileArgs) {
    const { fileLocation, fileContent } = fileArgs;
    await writeFile(fileLocation, fileContent, "utf-8");
}

export async function appendExistsFile(fileArgs: GenerateFileArgs) {
    const { fileLocation, fileContent } = fileArgs;
    await appendFile(fileLocation, `\n${fileContent}`, "utf-8");
}

export function getEnvVariables(config: Config): EnvConfig {
    const dockerEnvConfiguration = envConfigs[config.database];
    return dockerEnvConfiguration;
}

export function formatEnvFile(config: Config): string {
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

export function formatEnvExampleFile(config: Config): string {
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
