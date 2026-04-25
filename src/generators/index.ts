import { existsSync } from "node:fs";
import yaml from "js-yaml";
import type { Config, GenerateFileArgs } from "../types";
import { getDockerfile } from "../docker/builder";
import { getDockerComposeFile } from "../docker/compose";
import { getDockerIgnoreFile } from "../docker/dockerignore";
import {
    dockerComposeFileLocation,
    dockerfileLocation,
    dockerIgnoreFileLocation,
    envExampleFileLocation,
    envFileLocation,
    prodEnvFileLocation,
} from "../config";
import { appendExistsFile, formatEnvFiles, generateFile } from "../utils";

export async function setupDocker(config: Config) {
    const dockerContent = getDockerfile(config);
    const dockerComposeContentObject = getDockerComposeFile(config);
    const dockerIgnoreContent = getDockerIgnoreFile();

    const docker: GenerateFileArgs[] = [
        { fileLocation: dockerfileLocation, fileContent: dockerContent },
        {
            fileLocation: dockerIgnoreFileLocation,
            fileContent: dockerIgnoreContent,
        },
    ];

    if (typeof dockerComposeContentObject !== "undefined") {
        const dockerComposeContent = yaml.dump(dockerComposeContentObject, {
            indent: 4,
        });

        docker.push({
            fileLocation: dockerComposeFileLocation,
            fileContent: dockerComposeContent,
        });
    }

    await Promise.all(docker.map((whale) => generateFile({ ...whale })));
}

export async function setupEnv(config: Config): Promise<void> {
    const { envContent, exEnvContent, prodEnvContent } = formatEnvFiles(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFileLocation, fileContent: envContent },
        { fileLocation: prodEnvFileLocation, fileContent: prodEnvContent },
        {
            fileLocation: envExampleFileLocation,
            fileContent: exEnvContent,
        },
    ];

    if (
        existsSync(envFileLocation) ||
        existsSync(envExampleFileLocation) ||
        existsSync(prodEnvFileLocation)
    ) {
        await Promise.all(dotenvs.map((env) => appendExistsFile({ ...env })));
    } else {
        await Promise.all(dotenvs.map((env) => generateFile({ ...env })));
    }
}
