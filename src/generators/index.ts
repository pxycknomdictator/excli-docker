import { existsSync } from "node:fs";
import { appendExistsFile, generateFile } from "src/utils";
import {
    dbSections,
    dockerComposeFileLocation,
    dockerfileLocation,
    dockerIgnoreFileLocation,
    envConfigs,
    envExampleFileLocation,
    envFileLocation,
} from "src/config";
import { getDockerfile } from "src/docker/builder";
import { getDockerComposeFile } from "src/docker/compose";
import { getDockerIgnoreFile } from "src/docker/dockerignore";
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

export async function setupDocker(config: Config) {
    const dockerContent = getDockerfile(config);
    const dockerComposeContent = getDockerComposeFile(config);
    const dockerIgnoreContent = getDockerIgnoreFile();

    const docker: GenerateFileArgs[] = [
        { fileLocation: dockerfileLocation, fileContent: dockerContent },
        {
            fileLocation: dockerComposeFileLocation,
            fileContent: dockerComposeContent,
        },
        {
            fileLocation: dockerIgnoreFileLocation,
            fileContent: dockerIgnoreContent,
        },
    ];

    await Promise.all(
        docker.map(async (whale) => await generateFile({ ...whale })),
    );
}

export async function setupEnv(config: Config): Promise<void> {
    const envContent = formatEnvFile(config);
    const envExampleContent = formatEnvExampleFile(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        {
            fileLocation: envExampleFileLocation,
            fileContent: envExampleContent,
        },
    ];

    if (existsSync(envFileLocation) || existsSync(envExampleFileLocation)) {
        await Promise.all(
            dotenvs.map(async (env) => await appendExistsFile({ ...env })),
        );
    } else {
        await Promise.all(
            dotenvs.map(async (env) => await generateFile({ ...env })),
        );
    }
}
