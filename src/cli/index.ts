import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { Config } from "../types";

export function getUserInputs(): Config {
    const args = process.argv.slice(2);
    if (args.length > 0) return yargsInput();
    return interactiveInput();
}

export function yargsInput(): Config {
    const argv = yargs(hideBin(process.argv))
        .option("ts", {
            type: "boolean",
            description: "Use TypeScript",
            conflicts: "js",
        })
        .option("js", {
            type: "boolean",
            description: "Use JavaScript",
            conflicts: "ts",
        })
        .option("mongodb", {
            type: "boolean",
            description: "Use MongoDB",
            conflicts: ["postgres", "mysql", "mariadb"],
        })
        .option("postgres", {
            type: "boolean",
            description: "Use PostgreSQL",
            conflicts: ["mongodb", "mysql", "mariadb"],
        })
        .option("mysql", {
            type: "boolean",
            description: "Use MySQL",
            conflicts: ["mongodb", "postgres", "mariadb"],
        })
        .option("mariadb", {
            type: "boolean",
            description: "Use MariaDB",
            conflicts: ["mongodb", "postgres", "mysql"],
        })
        .option("npm", {
            type: "boolean",
            description: "Use npm",
            conflicts: ["yarn", "pnpm", "bun"],
        })
        .option("yarn", {
            type: "boolean",
            description: "Use Yarn",
            conflicts: ["npm", "pnpm", "bun"],
        })
        .option("pnpm", {
            type: "boolean",
            description: "Use pnpm",
            conflicts: ["npm", "yarn", "bun"],
        })
        .option("bun", {
            type: "boolean",
            description: "Use Bun",
            conflicts: ["npm", "yarn", "pnpm"],
        })
        .check((argv) => {
            if (!argv.ts && !argv.js) {
                throw new Error("You must specify a language: --ts or --js");
            }
            if (
                !argv.mongodb &&
                !argv.postgres &&
                !argv.mysql &&
                !argv.mariadb
            ) {
                throw new Error(
                    "You must specify a database: --mongodb, --postgres, --mysql, or --mariadb",
                );
            }
            if (!argv.npm && !argv.yarn && !argv.pnpm && !argv.bun) {
                throw new Error(
                    "You must specify a package manager: --npm, --yarn, --pnpm, or --bun",
                );
            }
            return true;
        })
        .help()
        .alias("help", "h")
        .parseSync();

    let language: Config["language"];
    if (argv.ts) language = "ts";
    else if (argv.js) language = "js";
    else throw new Error("Invalid language");

    let database: Config["database"];
    if (argv.mongodb) database = "mongodb";
    else if (argv.postgres) database = "postgres";
    else if (argv.mysql) database = "mysql";
    else if (argv.mariadb) database = "mariadb";
    else throw new Error("Invalid database");

    let packageManager: Config["packageManager"];
    if (argv.npm) packageManager = "npm";
    else if (argv.yarn) packageManager = "yarn";
    else if (argv.pnpm) packageManager = "pnpm";
    else if (argv.bun) packageManager = "bun";
    else throw new Error("Invalid package manager");

    const config: Config = {
        language,
        database,
        packageManager,
    };

    return config;
}

export function interactiveInput(): Config {
    return { database: "mariadb", language: "ts", packageManager: "yarn" };
}
