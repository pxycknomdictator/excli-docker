import { existsSync } from "node:fs";
import {
    appendExistsFile,
    formatEnvExampleFile,
    formatEnvFile,
    generateFile,
} from "src/utils";
import {
    dockerComposeFileLocation,
    dockerfileLocation,
    dockerIgnoreFileLocation,
    envExampleFileLocation,
    envFileLocation,
} from "src/config";
import { getDockerfile } from "src/docker/builder";
import { getDockerComposeFile } from "src/docker/compose";
import { getDockerIgnoreFile } from "src/docker/dockerignore";
import type { Config, GenerateFileArgs } from "src/types";

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
