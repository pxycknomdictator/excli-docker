import { writeFile, appendFile } from "node:fs/promises";
import { cancel } from "@clack/prompts";
import type { Config, EnvConfig, GenerateFileArgs } from "../types";
import { cacheSelection, dbSections, envConfigs } from "../config";

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

export function formatEnvFiles(config: Config): {
    envContent: string;
    exEnvContent: string;
} {
    const { baseEnv, dockerEnv } = getEnvVariables(config);

    const envLines: string[] = [];
    const exEnvLines: string[] = [];

    const isSqlite = config.database === "sqlite";

    envLines.push("# Database Connection");
    envLines.push(`DATABASE_URL=${baseEnv.DATABASE_URL}`);
    exEnvLines.push("# Database Connection");
    exEnvLines.push("DATABASE_URL=");

    const section = dbSections[config.database];

    if (!isSqlite) {
        envLines.push(`\n${section.main}`);
        section.mainKeys.forEach((key) => {
            envLines.push(`${key}=${dockerEnv[key]}`);
        });
        envLines.push(`\n${section.admin}`);
        section.adminKeys.forEach((key) => {
            envLines.push(`${key}=${dockerEnv[key]}`);
        });

        exEnvLines.push(`\n${section.main}`);
        section.mainKeys.forEach((key) => {
            exEnvLines.push(`${key}=`);
        });
        exEnvLines.push(`\n${section.admin}`);
        section.adminKeys.forEach((key) => {
            exEnvLines.push(`${key}=`);
        });
    }

    if (config.cache === "redis") {
        const redisEnv = envConfigs.redis;
        const redisSection = cacheSelection.redis;

        envLines.push(`\n# Redis Connection`);
        envLines.push(`REDIS_URL=${redisEnv.baseEnv.REDIS_URL}\n`);

        envLines.push(redisSection.main);
        envLines.push(`REDIS_PORT=${redisEnv.dockerEnv.REDIS_PORT}`);
        envLines.push(`REDIS_PASSWORD=${redisEnv.dockerEnv.REDIS_PASSWORD}`);
        envLines.push(`REDIS_ARGS=${redisEnv.dockerEnv.REDIS_ARGS}`);

        exEnvLines.push(`\n# Redis Connection`);
        exEnvLines.push(`REDIS_URL=\n`);

        exEnvLines.push(redisSection.main);
        exEnvLines.push("REDIS_PORT=");
        exEnvLines.push("REDIS_PASSWORD=");
        exEnvLines.push("REDIS_ARGS=");
    }

    return {
        envContent: envLines.join("\n"),
        exEnvContent: exEnvLines.join("\n"),
    };
}

export function terminate(message: string): never {
    cancel(message);
    process.exit(0);
}
