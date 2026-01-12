import { writeFile, appendFile } from "node:fs/promises";
import { getDockerfile } from "src/docker/builder";
import { getDockerComposeFile } from "src/docker/compose";
import type { Config, GenerateFileArgs } from "src/types";
import { dockerfileLocation, dockerComposeFileLocation } from "src/config";

export async function generateFile(fileArgs: GenerateFileArgs) {
    const { fileLocation, fileContent } = fileArgs;
    await writeFile(fileLocation, fileContent, "utf-8");
}

export async function appendExistsFile(fileArgs: GenerateFileArgs) {
    const { fileLocation, fileContent } = fileArgs;
    await appendFile(fileLocation, `\n${fileContent}`, "utf-8");
}

export async function setupDocker(config: Config) {
    const dockerContent = getDockerfile(config);
    const dockerComposeContent = getDockerComposeFile(config);

    const docker: GenerateFileArgs[] = [
        { fileLocation: dockerfileLocation, fileContent: dockerContent },
        {
            fileLocation: dockerComposeFileLocation,
            fileContent: dockerComposeContent,
        },
    ];

    await Promise.all(
        docker.map(async (whale) => await generateFile({ ...whale })),
    );
}
