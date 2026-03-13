import { isCancel, select, confirm } from "@clack/prompts";
import { terminate } from "src/utils";
import type { Config, INTERACTIVE_PROMPTS } from "src/types";
import { databases, languages, pkg_managers } from "src/config";

async function promptLanguage(): Promise<Config["language"]> {
    const language = await select({
        message: "Select your programming language:",
        options: languages.map(
            ({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
                label: `${label} ${emoji}`,
                value: value,
            }),
        ),
    });

    if (isCancel(language)) terminate("Process cancelled ❌");

    return language as Config["language"];
}

async function promptDatabase(): Promise<Config["database"]> {
    const database = await select({
        message: "Choose your database",
        options: databases.map(
            ({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
                label: `${label} ${emoji}`,
                value: value,
            }),
        ),
    });

    if (isCancel(database)) terminate("Process cancelled ❌");

    return database as Config["database"];
}

async function promptPkgManager(): Promise<Config["packageManager"]> {
    const pkgManager = await select({
        message: "Select your package manager:",
        options: pkg_managers.map(
            ({ label, emoji, value }: INTERACTIVE_PROMPTS) => ({
                label: `${label} ${emoji}`,
                value: value,
            }),
        ),
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
