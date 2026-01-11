import { writeFile } from "node:fs/promises";
import type { GenerateFileArgs } from "src/types";

export async function generateFile(fileArgs: GenerateFileArgs) {
    const { fileLocation, fileContent } = fileArgs;
    await writeFile(fileLocation, fileContent, "utf-8");
}
