import { isCancel, select, confirm } from "@clack/prompts";
import { terminate } from "src/utils";
import type { Config } from "src/types";

async function promptLanguage(): Promise<Config["language"]> {
    const language = (await select({
        message: "Select your programming language:",
        options: [
            { label: "TypeScript", value: "ts" },
            { label: "JavaScript", value: "js" },
        ],
    })) as Config["language"];

    if (isCancel(language)) terminate("Process cancelled ❌");

    return language;
}

async function promptDatabase(): Promise<Config["database"]> {
    const db = (await select({
        message: "Select your database:",
        options: [
            { label: "MySQL", value: "mysql" },
            { label: "MariaDB", value: "mariadb" },
            { label: "PostgreSQL", value: "postgres" },
            { label: "MongoDB", value: "mongodb" },
        ],
    })) as Config["database"];

    if (isCancel(db)) terminate("Process cancelled ❌");

    return db;
}

async function promptPkgManager(): Promise<Config["packageManager"]> {
    const pkgManager = (await select({
        message: "Select your package manager:",
        options: [
            { label: "npm", value: "npm" },
            { label: "yarn", value: "yarn" },
            { label: "pnpm", value: "pnpm" },
            { label: "bun", value: "bun" },
        ],
    })) as Config["packageManager"];

    if (isCancel(pkgManager)) terminate("Process cancelled ❌");

    return pkgManager;
}

async function promptCache(): Promise<Config["cache"]> {
    const shouldUseRedisCache = await confirm({
        message: "Do you want to integrate Redis for Cache?",
    });

    if (isCancel(shouldUseRedisCache)) terminate("Process cancelled ❌");

    return shouldUseRedisCache ? "redis" : undefined;
}

export async function interactiveInput(): Promise<Config> {
    const database = await promptDatabase();
    const language = await promptLanguage();
    const packageManager = await promptPkgManager();
    const cache = await promptCache();

    return { database, language, packageManager, ...(cache && { cache }) };
}
