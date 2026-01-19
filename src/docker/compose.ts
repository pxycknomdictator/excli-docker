import type { Config, DockerComposeConfig } from "src/types";

function dockerMongodb(): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mongodb_container",
                image: "mongo:8.0.17",
                ports: ["${MONGODB_PORT}:27017"],
                environment: {
                    MONGO_INITDB_DATABASE: "${MONGO_INITDB_DATABASE}",
                    MONGO_INITDB_ROOT_USERNAME: "${MONGO_INITDB_ROOT_USERNAME}",
                    MONGO_INITDB_ROOT_PASSWORD: "${MONGO_INITDB_ROOT_PASSWORD}",
                },
                networks: ["app_network"],
                volumes: ["mongo_volume:/data/db"],
            },
            admin: {
                container_name: "mongodb_admin",
                image: "mongo-express:1.0.2",
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
                depends_on: ["database"],
                networks: ["app_network"],
            },
        },
        networks: {
            app_network: {},
        },
        volumes: {
            mongo_volume: {},
        },
    };
}

function dockerPostgres(): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "postgres_container",
                image: "postgres:18",
                ports: ["${POSTGRES_PORT}:5432"],
                environment: {
                    POSTGRES_DB: "${POSTGRES_DB}",
                    POSTGRES_USER: "${POSTGRES_USER}",
                    POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}",
                },
                networks: ["app_network"],
                volumes: ["pg_volume:/var/lib/postgresql"],
            },
            admin: {
                container_name: "postgres_admin",
                image: "dpage/pgadmin4:9.11",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PGADMIN_DEFAULT_EMAIL: "${PGADMIN_DEFAULT_EMAIL}",
                    PGADMIN_DEFAULT_PASSWORD: "${PGADMIN_DEFAULT_PASSWORD}",
                },
                networks: ["app_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            app_network: {},
        },
        volumes: {
            pg_volume: {},
        },
    };
}

function dockerMysql(): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mysql_container",
                image: "mysql:8.4.6",
                ports: ["${MYSQL_PORT}:3306"],
                environment: {
                    MYSQL_DATABASE: "${MYSQL_DATABASE}",
                    MYSQL_USER: "${MYSQL_USER}",
                    MYSQL_PASSWORD: "${MYSQL_PASSWORD}",
                    MYSQL_ROOT_PASSWORD: "${MYSQL_ROOT_PASSWORD}",
                },
                networks: ["app_network"],
                volumes: ["mysql_volume:/var/lib/mysql"],
            },
            admin: {
                container_name: "mysql_admin",
                image: "phpmyadmin:5.2.3",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PMA_HOST: "${PMA_HOST}",
                },
                networks: ["app_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            app_network: {},
        },
        volumes: {
            mysql_volume: {},
        },
    };
}

function dockerMariadb(): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "mariadb_container",
                image: "mariadb:11.4.5",
                ports: ["${MARIADB_PORT}:3306"],
                environment: {
                    MARIADB_DATABASE: "${MARIADB_DATABASE}",
                    MARIADB_USER: "${MARIADB_USER}",
                    MARIADB_PASSWORD: "${MARIADB_PASSWORD}",
                    MARIADB_ROOT_PASSWORD: "${MARIADB_ROOT_PASSWORD}",
                },
                networks: ["app_network"],
                volumes: ["mariadb_volume:/var/lib/mysql"],
            },
            admin: {
                container_name: "mariadb_admin",
                image: "phpmyadmin:5.2.3",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PMA_HOST: "${PMA_HOST}",
                },
                networks: ["app_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            app_network: {},
        },
        volumes: {
            mariadb_volume: {},
        },
    };
}

export function dockerRedis(): DockerComposeConfig {
    return {
        services: {
            cache: {
                container_name: "redis_container",
                image: "redis/redis-stack-server:7.4.0-v8",
                ports: ["${REDIS_PORT}:6379"],
                environment: {
                    REDIS_ARGS: "${REDIS_ARGS}",
                },
                networks: ["app_network"],
                volumes: ["redis_volume:/data"],
            },
        },
        networks: {
            app_network: {},
        },
        volumes: {
            redis_volume: {},
        },
    };
}

export function getDockerComposeFile(config: Config): DockerComposeConfig {
    let database: DockerComposeConfig;

    switch (config.database) {
        case "mongodb":
            database = dockerMongodb();
            break;
        case "postgres":
            database = dockerPostgres();
            break;
        case "mysql":
            database = dockerMysql();
            break;
        case "mariadb":
            database = dockerMariadb();
            break;
        default:
            throw new Error("Invalid database selected");
    }

    if (typeof config.cache === "string" && config.cache === "redis") {
        const redis = dockerRedis();
        return {
            services: { ...database.services, ...redis.services },
            networks: { ...database.networks, ...redis.networks },
            volumes: { ...database.volumes, ...redis.volumes },
        };
    }

    return database;
}
