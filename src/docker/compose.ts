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
                networks: ["mongodb_network"],
                volumes: ["mongodb_volume:/data/db"],
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
                networks: ["mongodb_network"],
            },
        },
        networks: {
            mongodb_network: null,
        },
        volumes: {
            mongodb_volume: null,
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
                networks: ["postgres_network"],
                volumes: ["postgres_volume:/var/lib/postgresql"],
            },
            admin: {
                container_name: "postgres_admin",
                image: "dpage/pgadmin4:9.11",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PGADMIN_DEFAULT_EMAIL: "${PGADMIN_DEFAULT_EMAIL}",
                    PGADMIN_DEFAULT_PASSWORD: "${PGADMIN_DEFAULT_PASSWORD}",
                },
                networks: ["postgres_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            postgres_network: null,
        },
        volumes: {
            postgres_volume: null,
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
                networks: ["mysql_network"],
                volumes: ["mysql_volume:/var/lib/mysql"],
            },
            admin: {
                container_name: "mysql_admin",
                image: "phpmyadmin:5.2.3",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PMA_HOST: "${PMA_HOST}",
                },
                networks: ["mysql_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            mysql_network: null,
        },
        volumes: {
            mysql_volume: null,
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
                networks: ["mariadb_network"],
                volumes: ["mariadb_volume:/var/lib/mysql"],
            },
            admin: {
                container_name: "mariadb_admin",
                image: "phpmyadmin:5.2.3",
                ports: ["${ADMIN_PANEL_PORT}:80"],
                environment: {
                    PMA_HOST: "${PMA_HOST}",
                },
                networks: ["mariadb_network"],
                depends_on: ["database"],
            },
        },
        networks: {
            mariadb_network: null,
        },
        volumes: {
            mariadb_volume: null,
        },
    };
}

export function dockerRedis(): DockerComposeConfig {
    return {
        services: {
            database: {
                container_name: "redis_container",
                image: "redis/redis-stack-server:7.4.0-v8",
                ports: ["${REDIS_PORT}:6379"],
                environment: {
                    REDIS_ARGS: "${REDIS_ARGS}",
                },
                networks: ["redis_network"],
                volumes: ["redis_volume:/data"],
            },
        },
        networks: {
            redis_network: null,
        },
        volumes: {
            redis_volume: null,
        },
    };
}

export function getDockerComposeFile(config: Config): DockerComposeConfig {
    switch (config.database) {
        case "mongodb":
            return dockerMongodb();
        case "postgres":
            return dockerPostgres();
        case "mysql":
            return dockerMysql();
        case "mariadb":
            return dockerMariadb();
        default:
            throw new Error("Invalid database selected:");
    }
}
