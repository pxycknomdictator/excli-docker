export type Config = {
    language: "ts" | "js";
    database: "mysql" | "mariadb" | "postgres" | "mongodb";
    packageManager: "npm" | "yarn" | "pnpm" | "bun";
};
