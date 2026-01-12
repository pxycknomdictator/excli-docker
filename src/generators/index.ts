import { join } from "node:path";
import { generateFile } from "src/utils";
import type { Config, EnvConfig, GenerateFileArgs } from "src/types";

function getEnvVariables(config: Config): EnvConfig {
    const envConfigs = {
        mongodb: {
            baseEnv: {
                DATABASE_URL:
                    "mongodb://admin:password123@localhost:27017/app_db?authSource=admin",
            },
            dockerEnv: {
                MONGODB_PORT: "27017",
                ADMIN_PANEL_PORT: "6969",
                MONGODB_HOST: "localhost",
                MONGO_INITDB_DATABASE: "app_db",
                MONGO_INITDB_ROOT_USERNAME: "admin",
                MONGO_INITDB_ROOT_PASSWORD: "password123",
                ME_CONFIG_MONGODB_ADMINUSERNAME: "admin",
                ME_CONFIG_MONGODB_ADMINPASSWORD: "password123",
                ME_CONFIG_MONGODB_SERVER: "mongodb_container",
                ME_CONFIG_BASICAUTH_USERNAME: "admin",
                ME_CONFIG_BASICAUTH_PASSWORD: "adminpassword",
            },
        },
        postgres: {
            baseEnv: {
                DATABASE_URL:
                    "postgresql://admin:password123@localhost:5432/app_db",
            },
            dockerEnv: {
                POSTGRES_PORT: "5432",
                ADMIN_PANEL_PORT: "6969",
                POSTGRES_HOST: "localhost",
                POSTGRES_DB: "app_db",
                POSTGRES_USER: "admin",
                POSTGRES_PASSWORD: "password123",
                PGADMIN_DEFAULT_EMAIL: "admin@example.com",
                PGADMIN_DEFAULT_PASSWORD: "adminpassword",
            },
        },
        mysql: {
            baseEnv: {
                DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
            },
            dockerEnv: {
                MYSQL_PORT: "3306",
                ADMIN_PANEL_PORT: "6969",
                MYSQL_HOST: "localhost",
                MYSQL_DATABASE: "app_db",
                MYSQL_USER: "user",
                MYSQL_PASSWORD: "password123",
                MYSQL_ROOT_PASSWORD: "rootpassword",
                PMA_HOST: "database",
            },
        },
        mariadb: {
            baseEnv: {
                DATABASE_URL: "mysql://user:password123@localhost:3306/app_db",
            },
            dockerEnv: {
                MARIADB_PORT: "3306",
                ADMIN_PANEL_PORT: "6969",
                MARIADB_HOST: "localhost",
                MARIADB_DATABASE: "app_db",
                MARIADB_USER: "user",
                MARIADB_PASSWORD: "password123",
                MARIADB_ROOT_PASSWORD: "rootpassword",
                PMA_HOST: "database",
            },
        },
    };

    const dockerEnvConfiguration = envConfigs[config.database];
    return dockerEnvConfiguration;
}

function formatEnvFile(config: Config): string {
    const { baseEnv, dockerEnv } = getEnvVariables(config);
    const lines: string[] = [];

    lines.push("# Database Connection");
    lines.push(`DATABASE_URL=${baseEnv.DATABASE_URL}`);
    lines.push("");

    const sections = {
        mongodb: {
            main: "# MongoDB Configuration",
            admin: "# Mongo Express Admin Panel",
            mainKeys: [
                "MONGODB_PORT",
                "MONGODB_HOST",
                "MONGO_INITDB_DATABASE",
                "MONGO_INITDB_ROOT_USERNAME",
                "MONGO_INITDB_ROOT_PASSWORD",
            ],
            adminKeys: [
                "ADMIN_PANEL_PORT",
                "ME_CONFIG_MONGODB_ADMINUSERNAME",
                "ME_CONFIG_MONGODB_ADMINPASSWORD",
                "ME_CONFIG_MONGODB_SERVER",
                "ME_CONFIG_BASICAUTH_USERNAME",
                "ME_CONFIG_BASICAUTH_PASSWORD",
            ],
        },
        postgres: {
            main: "# PostgreSQL Configuration",
            admin: "# pgAdmin Admin Panel",
            mainKeys: [
                "POSTGRES_PORT",
                "POSTGRES_HOST",
                "POSTGRES_DB",
                "POSTGRES_USER",
                "POSTGRES_PASSWORD",
            ],
            adminKeys: [
                "ADMIN_PANEL_PORT",
                "PGADMIN_DEFAULT_EMAIL",
                "PGADMIN_DEFAULT_PASSWORD",
            ],
        },
        mysql: {
            main: "# MySQL Configuration",
            admin: "# phpMyAdmin Admin Panel",
            mainKeys: [
                "MYSQL_PORT",
                "MYSQL_HOST",
                "MYSQL_DATABASE",
                "MYSQL_USER",
                "MYSQL_PASSWORD",
                "MYSQL_ROOT_PASSWORD",
            ],
            adminKeys: ["ADMIN_PANEL_PORT", "PMA_HOST"],
        },
        mariadb: {
            main: "# MariaDB Configuration",
            admin: "# phpMyAdmin Admin Panel",
            mainKeys: [
                "MARIADB_PORT",
                "MARIADB_HOST",
                "MARIADB_DATABASE",
                "MARIADB_USER",
                "MARIADB_PASSWORD",
                "MARIADB_ROOT_PASSWORD",
            ],
            adminKeys: ["ADMIN_PANEL_PORT", "PMA_HOST"],
        },
    };

    const section = sections[config.database];

    lines.push(section.main);
    section.mainKeys.forEach((key) => {
        lines.push(`${key}=${dockerEnv[key]}`);
    });

    lines.push("");
    lines.push(section.admin);
    section.adminKeys.forEach((key) => {
        lines.push(`${key}=${dockerEnv[key]}`);
    });

    return lines.join("\n");
}

function formatEnvExampleFile(config: Config): string {
    const lines: string[] = [];

    lines.push("# Database Connection");
    lines.push("DATABASE_URL=");
    lines.push("");

    const sections = {
        mongodb: {
            main: "# MongoDB Configuration",
            admin: "# Mongo Express Admin Panel",
            mainKeys: [
                "MONGODB_PORT",
                "MONGODB_HOST",
                "MONGO_INITDB_DATABASE",
                "MONGO_INITDB_ROOT_USERNAME",
                "MONGO_INITDB_ROOT_PASSWORD",
            ],
            adminKeys: [
                "ADMIN_PANEL_PORT",
                "ME_CONFIG_MONGODB_ADMINUSERNAME",
                "ME_CONFIG_MONGODB_ADMINPASSWORD",
                "ME_CONFIG_MONGODB_SERVER",
                "ME_CONFIG_BASICAUTH_USERNAME",
                "ME_CONFIG_BASICAUTH_PASSWORD",
            ],
        },
        postgres: {
            main: "# PostgreSQL Configuration",
            admin: "# pgAdmin Admin Panel",
            mainKeys: [
                "POSTGRES_PORT",
                "POSTGRES_HOST",
                "POSTGRES_DB",
                "POSTGRES_USER",
                "POSTGRES_PASSWORD",
            ],
            adminKeys: [
                "ADMIN_PANEL_PORT",
                "PGADMIN_DEFAULT_EMAIL",
                "PGADMIN_DEFAULT_PASSWORD",
            ],
        },
        mysql: {
            main: "# MySQL Configuration",
            admin: "# phpMyAdmin Admin Panel",
            mainKeys: [
                "MYSQL_PORT",
                "MYSQL_HOST",
                "MYSQL_DATABASE",
                "MYSQL_USER",
                "MYSQL_PASSWORD",
                "MYSQL_ROOT_PASSWORD",
            ],
            adminKeys: ["ADMIN_PANEL_PORT", "PMA_HOST"],
        },
        mariadb: {
            main: "# MariaDB Configuration",
            admin: "# phpMyAdmin Admin Panel",
            mainKeys: [
                "MARIADB_PORT",
                "MARIADB_HOST",
                "MARIADB_DATABASE",
                "MARIADB_USER",
                "MARIADB_PASSWORD",
                "MARIADB_ROOT_PASSWORD",
            ],
            adminKeys: ["ADMIN_PANEL_PORT", "PMA_HOST"],
        },
    };

    const section = sections[config.database];

    lines.push(section.main);
    section.mainKeys.forEach((key) => {
        lines.push(`${key}=`);
    });

    lines.push("");
    lines.push(section.admin);
    section.adminKeys.forEach((key) => {
        lines.push(`${key}=`);
    });

    return lines.join("\n");
}

export async function setupEnv(
    targetDir: string,
    config: Config,
): Promise<void> {
    const envFile = join(targetDir, ".env");
    const envExampleFile = join(targetDir, ".env.example");

    const envContent = formatEnvFile(config);
    const envExampleContent = formatEnvExampleFile(config);

    const dotenvs: GenerateFileArgs[] = [
        { fileLocation: envFile, fileContent: envContent },
        { fileLocation: envExampleFile, fileContent: envExampleContent },
    ];

    await Promise.all(
        dotenvs.map(async (env) => await generateFile({ ...env })),
    );
}
