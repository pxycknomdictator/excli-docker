import { getDirectoryName } from "../config";
import type { Config, DockerComposeConfig } from "../types";

function dockerMongodb(directory: string): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mongodb",
                image: "mongo:${MONGODB_VERSION}",
                restart: "unless-stopped",
                ports: ["${MONGODB_PORT}:27017"],
                environment: {
                    MONGO_INITDB_DATABASE: "${MONGO_INITDB_DATABASE}",
                    MONGO_INITDB_ROOT_USERNAME: "${MONGO_INITDB_ROOT_USERNAME}",
                    MONGO_INITDB_ROOT_PASSWORD: "${MONGO_INITDB_ROOT_PASSWORD}",
                },
                networks: [directory],
                volumes: ["mongo_volume:/data/db"],
                healthcheck: {
                    test: [
                        "CMD",
                        "mongosh",
                        "--quiet",
                        "mongodb://localhost:27017/admin",
                        "--eval",
                        "db.runCommand({ ping: 1 })",
                    ],
                    interval: "5s",
                    timeout: "5s",
                    retries: 10,
                    start_period: "20s",
                },
            },
        },
        networks: { [directory]: {} },
        volumes: { mongo_volume: {} },
    };
}

function dockerMongodbAdmin(directory: string): DockerComposeConfig {
    return {
        services: {
            admin: {
                container_name: "admin",
                image: "mongo-express:${MONGODB_ADMIN_PANEL_VERSION}",
                restart: "unless-stopped",
                ports: ["${ADMIN_PANEL_PORT}:8081"],
                environment: {
                    ME_CONFIG_MONGODB_ADMINUSERNAME:
                        "${ME_CONFIG_MONGODB_ADMINUSERNAME}",
                    ME_CONFIG_MONGODB_ADMINPASSWORD:
                        "${ME_CONFIG_MONGODB_ADMINPASSWORD}",
                    ME_CONFIG_MONGODB_SERVER: "${ME_CONFIG_MONGODB_SERVER}",
                    ME_CONFIG_BASICAUTH_USERNAME:
                        "${ME_CONFIG_BASICAUTH_USERNAME}",
                    ME_CONFIG_BASICAUTH_PASSWORD:
                        "${ME_CONFIG_BASICAUTH_PASSWORD}",
                },
                depends_on: { database: { condition: "service_healthy" } },
                networks: [directory],
            },
        },
    };
}

function dockerPostgres(directory: string): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "postgres",
                image: "postgres:${POSTGRES_VERSION}",
                restart: "unless-stopped",
                ports: ["${POSTGRES_PORT}:5432"],
                environment: {
                    POSTGRES_DB: "${POSTGRES_DB}",
                    POSTGRES_USER: "${POSTGRES_USER}",
                    POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}",
                },
                networks: [directory],
                volumes: ["pg_volume:/var/lib/postgresql"],
                healthcheck: {
                    test: [
                        "CMD-SHELL",
                        "PGPASSWORD=${POSTGRES_PASSWORD} pg_isready -h localhost -U ${POSTGRES_USER} -d ${POSTGRES_DB}",
                    ],
                    interval: "5s",
                    timeout: "5s",
                    retries: 10,
                    start_period: "20s",
                },
            },
        },
        networks: { [directory]: {} },
        volumes: { pg_volume: {} },
    };
}

function dockerPostgresAdmin(directory: string): DockerComposeConfig {
    return {
        services: {
            admin: {
                container_name: "admin",
                image: "dpage/pgadmin4:${PGADMIN_PANEL_VERSION}",
                restart: "unless-stopped",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PGADMIN_DEFAULT_EMAIL: "${PGADMIN_DEFAULT_EMAIL}",
                    PGADMIN_DEFAULT_PASSWORD: "${PGADMIN_DEFAULT_PASSWORD}",
                },
                networks: [directory],
                depends_on: { database: { condition: "service_healthy" } },
            },
        },
    };
}

function dockerMysql(directory: string): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mysql",
                image: "mysql:${MYSQL_VERSION}",
                restart: "unless-stopped",
                ports: ["${MYSQL_PORT}:3306"],
                environment: {
                    MYSQL_DATABASE: "${MYSQL_DATABASE}",
                    MYSQL_USER: "${MYSQL_USER}",
                    MYSQL_PASSWORD: "${MYSQL_PASSWORD}",
                    MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}",
                },
                networks: [directory],
                volumes: ["mysql_volume:/var/lib/mysql"],
                healthcheck: {
                    test: [
                        "CMD-SHELL",
                        "mysqladmin ping -h localhost -u${MYSQL_USER} -p${MYSQL_PASSWORD} || exit 1",
                    ],
                    interval: "5s",
                    timeout: "5s",
                    retries: 10,
                    start_period: "20s",
                },
            },
        },
        networks: { [directory]: {} },
        volumes: { mysql_volume: {} },
    };
}

function dockerMysqlAdmin(directory: string): DockerComposeConfig {
    return {
        services: {
            admin: {
                container_name: "admin",
                image: "phpmyadmin:${PHP_ADMIN_PANEL_VERSION}",
                restart: "unless-stopped",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: { PMA_HOST: "${PMA_HOST}" },
                networks: [directory],
                depends_on: { database: { condition: "service_healthy" } },
            },
        },
    };
}

function dockerMariadb(directory: string): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mariadb",
                image: "mariadb:${MARIADB_VERSION}",
                restart: "unless-stopped",
                ports: ["${MARIADB_PORT}:3306"],
                environment: {
                    MARIADB_DATABASE: "${MARIADB_DATABASE}",
                    MARIADB_USER: "${MARIADB_USER}",
                    MARIADB_PASSWORD: "${MARIADB_PASSWORD}",
                    MARIADB_ROOT_PASSWORD: "${MARIADB_ROOT_PASSWORD}",
                },
                networks: [directory],
                volumes: ["mariadb_volume:/var/lib/mysql"],
                healthcheck: {
                    test: [
                        "CMD-SHELL",
                        "healthcheck.sh --connect --innodb_initialized",
                    ],
                    interval: "10s",
                    timeout: "5s",
                    retries: 3,
                    start_period: "30s",
                },
            },
        },
        networks: { [directory]: {} },
        volumes: { mariadb_volume: {} },
    };
}

function dockerMariadbAdmin(directory: string): DockerComposeConfig {
    return {
        services: {
            admin: {
                container_name: "admin",
                image: "phpmyadmin:${PHP_ADMIN_PANEL_VERSION}",
                restart: "unless-stopped",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: { PMA_HOST: "${PMA_HOST}" },
                networks: [directory],
                depends_on: { database: { condition: "service_healthy" } },
            },
        },
    };
}

function dockerRedis(directory: string): DockerComposeConfig {
    return {
        services: {
            redis: {
                container_name: "memory",
                image: "redis:${REDIS_VERSION}",
                restart: "unless-stopped",
                ports: ["${REDIS_PORT}:6379"],
                environment: { REDIS_PASSWORD: "${REDIS_PASSWORD}" },
                command: "redis-server ${REDIS_ARGS}",
                networks: [directory],
                volumes: ["redis_volume:/data"],
                healthcheck: {
                    test: [
                        "CMD",
                        "redis-cli",
                        "-a",
                        "${REDIS_PASSWORD}",
                        "ping",
                    ],
                    interval: "5s",
                    timeout: "5s",
                    retries: 10,
                },
            },
        },
        networks: { [directory]: {} },
        volumes: { redis_volume: {} },
    };
}

export function getDockerComposeFile(
    config: Config,
): DockerComposeConfig | undefined {
    let database: DockerComposeConfig | undefined;
    const hasRedis = config.cache === "redis";
    const directory = getDirectoryName();

    switch (config.database) {
        case "mongodb":
            database = dockerMongodb(directory as string);
            break;
        case "postgres":
            database = dockerPostgres(directory as string);
            break;
        case "mysql":
            database = dockerMysql(directory as string);
            break;
        case "mariadb":
            database = dockerMariadb(directory as string);
            break;
        case "sqlite":
            break;
        default:
            throw new Error("Invalid database selected");
    }

    if (hasRedis) {
        const redis = dockerRedis(directory as string);

        if (database) {
            return {
                services: { ...database.services, ...redis.services },
                networks: { ...database.networks, ...redis.networks },
                volumes: { ...database.volumes, ...redis.volumes },
            };
        }

        return redis;
    }

    return database;
}

export function getDockerComposeAdmin(
    config: Config,
): DockerComposeConfig | undefined {
    const directory = getDirectoryName();

    switch (config.database) {
        case "mongodb":
            return dockerMongodbAdmin(directory as string);
        case "postgres":
            return dockerPostgresAdmin(directory as string);
        case "mysql":
            return dockerMysqlAdmin(directory as string);
        case "mariadb":
            return dockerMariadbAdmin(directory as string);
        case "sqlite":
            return undefined;
        default:
            throw new Error("Invalid database selected");
    }
}
