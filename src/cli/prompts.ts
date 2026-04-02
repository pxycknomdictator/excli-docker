import { isCancel, select, confirm } from "@clack/prompts";
import type { Config } from "../types";
import { databases, generateOptions, languages, pkg_managers } from "../config";
import { terminate } from "../utils";

async function promptLanguage(): Promise<Config["language"]> {
    const language = await select({
        message: "Select your programming language:",
        options: generateOptions(languages),
    });

    if (isCancel(language)) terminate("Process cancelled ❌");

    return language as Config["language"];
}

async function promptDatabase(): Promise<Config["database"]> {
    const database = await select({
        message: "Choose your database",
        options: generateOptions(databases),
    });

    if (isCancel(database)) terminate("Process cancelled ❌");

    return database as Config["database"];
}

async function promptPkgManager(): Promise<Config["packageManager"]> {
    const pkgManager = await select({
        message: "Select your package manager:",
        options: generateOptions(pkg_managers),
    });

    if (isCancel(pkgManager)) terminate("Process cancelled ❌");

    return pkgManager as Config["packageManager"];
}

async function promptCache(): Promise<Config["cache"]> {
    const shouldUseRedisCache = await confirm({
        message: "Do you want to integrate Redis for Cache?",
    });

    if (isCancel(shouldUseRedisCache)) terminate("Process cancelled ❌");

    return shouldUseRedisCache ? "redis" : undefined;
}

export async function interactiveInput(): Promise<Config> {
    const { displayBanner } = await import("./display");

    console.clear();
    displayBanner();

    const database = await promptDatabase();
    const language = await promptLanguage();
    const packageManager = await promptPkgManager();
    const cache = await promptCache();

    return { database, language, packageManager, ...(cache && { cache }) };
}
