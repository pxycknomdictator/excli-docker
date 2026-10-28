import { existsSync } from "node:fs";
import yaml from "js-yaml";
import type { Config, GenerateFileArgs } from "../types";
import { getDockerfile } from "../docker/builder";
import { getDockerComposeAdmin, getDockerComposeFile } from "../docker/compose";
import { getDockerIgnoreFile } from "../docker/dockerignore";
import {
    dockerComposeFileLocation,
    dockerfileLocation,
    dockerIgnoreFileLocation,
    envFileLocation,
    prodEnvFileLocation,
} from "../config";
import { appendExistsFile, formatEnvFiles, generateFile } from "../utils";

export async function setupDocker(config: Config) {
    const dockerContent = getDockerfile(config);
    const dockerComposeContentObject = getDockerComposeFile(config);
    const dockerComposeAdminContentObject = getDockerComposeAdmin(config);
    const dockerIgnoreContent = getDockerIgnoreFile();

    const docker: GenerateFileArgs[] = [
        { fileLocation: dockerfileLocation, fileContent: dockerContent },
        {
            fileLocation: dockerIgnoreFileLocation,
            fileContent: dockerIgnoreContent,
        },
    ];

    if (
        typeof dockerComposeContentObject !== "undefined" ||
        typeof dockerComposeAdminContentObject !== "undefined"
    ) {
        const dockerComposeContent = yaml.dump(
            {
                services: {
                    ...dockerComposeContentObject?.services,
                    ...dockerComposeAdminContentObject?.services,
                },
                networks: {
                    ...dockerComposeContentObject?.networks,
                    ...dockerComposeAdminContentObject?.networks,
                },
                volumes: {
                    ...dockerComposeContentObject?.volumes,
                    ...dockerComposeAdminContentObject?.volumes,
                },
            },
            { indent: 4 },
        );

        docker.push({
            fileLocation: dockerComposeFileLocation,
            fileContent: dockerComposeContent,
        });
    }

    await Promise.all(docker.map((whale) => generateFile({ ...whale })));
}

export async function setupEnv(config: Config): Promise<void> {
    const { envContent, prodEnvContent } = formatEnvFiles(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        { fileLocation: prodEnvFileLocation, fileContent: prodEnvContent },
    ];

    if (existsSync(envFileLocation) || existsSync(prodEnvFileLocation)) {
        await Promise.all(dotenvs.map((env) => appendExistsFile({ ...env })));
    } else {
        await Promise.all(dotenvs.map((env) => generateFile({ ...env })));
    }
}
