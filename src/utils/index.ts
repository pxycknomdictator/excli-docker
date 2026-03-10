import { writeFile, appendFile } from "node:fs/promises";
import { cancel } from "@clack/prompts";
import { dbSections, envConfigs, cacheSelection } from "src/config";
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
    const isSqlite = config.database === "sqlite";

    lines.push("# Database Connection");
    lines.push(`DATABASE_URL=${baseEnv.DATABASE_URL}`);

    const section = dbSections[config.database];

    if (!isSqlite) {
        lines.push(`\n${section.main}`);
        section.mainKeys.forEach((key) => {
            lines.push(`${key}=${dockerEnv[key]}`);
        });
    }

    if (!isSqlite) {
        lines.push(`\n${section.admin}`);
        section.adminKeys.forEach((key) => {
            lines.push(`${key}=${dockerEnv[key]}`);
        });
    }

    if (config.cache === "redis") {
        const redisEnv = envConfigs.redis;
        const redisSection = cacheSelection.redis;

        lines.push(`\n# Redis Connection`);
        lines.push(`REDIS_URL=${redisEnv.baseEnv.REDIS_URL}\n`);

        lines.push(redisSection.main);
        lines.push(`REDIS_PORT=${redisEnv.dockerEnv.REDIS_PORT}`);
        lines.push(`REDIS_ARGS=${redisEnv.dockerEnv.REDIS_ARGS}`);
    }

    return lines.join("\n");
}

export function formatEnvExampleFile(config: Config): string {
    const lines: string[] = [];

    const isSqlite = config.database === "sqlite";

    lines.push("# Database Connection");
    lines.push("DATABASE_URL=");

    const section = dbSections[config.database];

    if (!isSqlite) {
        lines.push(`\n${section.main}`);
        section.mainKeys.forEach((key) => {
            lines.push(`${key}=`);
        });
    }

    if (!isSqlite) {
        lines.push(`\n${section.admin}`);
        section.adminKeys.forEach((key) => {
            lines.push(`${key}=`);
        });
    }

    if (config.cache === "redis") {
        const redisSection = cacheSelection.redis;

        lines.push(`\n# Redis Connection`);
        lines.push(`REDIS_URL=\n`);

        lines.push(redisSection.main);
        lines.push("REDIS_PORT=");
        lines.push("REDIS_ARGS=");
    }

    return lines.join("\n");
}

export function terminate(message: string): never {
    cancel(message);
    process.exit(0);
}
