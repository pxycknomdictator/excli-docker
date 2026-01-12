import { join } from "node:path";

const rootDir = process.cwd();

const dockerFileName = "Dockerfile";
const dockerComposeFileName = "compose.yaml";

export const dockerfileLocation = join(rootDir, dockerFileName);
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
