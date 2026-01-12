export type Config = {
    language: "ts" | "js";
    database: "mysql" | "mariadb" | "postgres" | "mongodb";
    packageManager: "npm" | "yarn" | "pnpm" | "bun";
};

export type GenerateFileArgs = {
    fileLocation: string;
    fileContent: string;
};

export type EnvConfig = {
    baseEnv: Record<string, string>;
    dockerEnv: Record<string, string>;
};
