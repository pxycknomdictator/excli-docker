import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { Config } from "../types";

export function getUserInputs(): Config {
    const argv = yargs(hideBin(process.argv))
        .option("lang", {
            alias: "l",
            type: "string",
            description: "Programming language",
            choices: ["ts", "js"] as const,
            demandOption: true,
        })
        .option("db", {
            alias: "d",
            type: "string",
            description: "Database type",
            choices: ["mysql", "mariadb", "postgres", "mongodb"] as const,
            demandOption: true,
        })
        .option("pkgManager", {
            alias: "p",
            type: "string",
            description: "Package manager",
            choices: ["npm", "yarn", "pnpm", "bun"] as const,
            demandOption: true,
        })
        .help()
        .alias("help", "h")
        .parseSync();

    const config: Config = {
        language: argv.lang as Config["language"],
        database: argv.db as Config["database"],
        packageManager: argv.pkgManager as Config["packageManager"],
    };

    return config;
}
