import { join } from "node:path";

const rootDir = process.cwd();

const envFileName = ".env";
const envExampleFileName = ".env.example";
const dockerFileName = "Dockerfile";
const dockerComposeFileName = "compose.yaml";
const dockerIgnoreFileName = ".dockerignore";

export const envFileLocation = join(rootDir, envFileName);
export const envExampleFileLocation = join(rootDir, envExampleFileName);
export const dockerfileLocation = join(rootDir, dockerFileName);
export const dockerIgnoreFileLocation = join(rootDir, dockerIgnoreFileName);
export const dockerComposeFileLocation = join(rootDir, dockerComposeFileName);

export const lockFiles = {
    npm: "package-lock.json",
    yarn: "yarn.lock",
    pnpm: "pnpm-lock.yaml",
    bun: "bun.lockb",
};

export const installCmd = {
    npm: "npm install",
    yarn: "npm install -g yarn && yarn install",
    pnpm: "npm install -g pnpm && pnpm install",
    bun: "npm install -g bun && bun install",
};

export const buildCmd = {
    npm: "npm run build",
    yarn: "yarn build",
    pnpm: "pnpm build",
    bun: "bun run build",
};

export const envConfigs = {
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
    redis: {
        baseEnv: {
            REDIS_URL: "redis://localhost:6379",
        },
        dockerEnv: {
            REDIS_PORT: "6379",
            REDIS_ARGS: "--appendonly yes --appendfsync everysec",
        },
    },
};

export const dbSections = {
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

export const cacheSelection = {
    redis: {
        main: "# Redis Configuration",
        mainKeys: ["REDIS_PORT", "REDIS_ARGS"],
    },
};

export const BANNER_FONT = "Standard";
