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
    prodEnvContent: string;
} {
    const { baseEnv, dockerEnv } = getEnvVariables(config);

    const env: string[] = [
        "# Database Connection",
        `DATABASE_URL=${baseEnv.DATABASE_URL}`,
    ];
    const prod: string[] = [
        "# Database Connection",
        `DATABASE_URL=${baseEnv.DATABASE_URL?.replace("localhost", "database")}`,
    ];

    if (config.database !== "sqlite") {
        const section = dbSections[config.database];

        for (const [header, keys] of [
            [section.main, section.mainKeys],
            [section.admin, section.adminKeys],
        ] as const) {
            env.push(`\n${header}`, ...keys.map((k) => `${k}=${dockerEnv[k]}`));
            prod.push(
                `\n${header}`,
                ...keys.map(
                    (k) =>
                        `${k}=${dockerEnv[k]?.replace("localhost", "database")}`,
                ),
            );
        }
    }

    if (config.cache === "redis") {
        const { baseEnv: rb, dockerEnv: rd } = envConfigs.redis;
        const keys = cacheSelection.redis.mainKeys as (keyof typeof rd)[];
        const header = cacheSelection.redis.main;

        env.push(
            `\n# Redis Connection`,
            `REDIS_URL=${rb.REDIS_URL}\n`,
            header,
            ...keys.map((k) => `${k}=${rd[k]}`),
        );
        prod.push(
            `\n# Redis Connection`,
            `REDIS_URL=${rb.REDIS_URL.replace("localhost", "redis")}\n`,
            header,
            ...keys.map((k) => `${k}=${rd[k]}`),
        );
    }

    return { envContent: env.join("\n"), prodEnvContent: prod.join("\n") };
}

export function terminate(message: string): never {
    cancel(message);
    process.exit(0);
}
