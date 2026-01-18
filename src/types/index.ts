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

export type DockerComposeConfig = {
    services: {
        [key: string]: {
            container_name: string;
            image: string;
            ports: string[];
            environment: { [key: string]: string };
            networks: string[];
            volumes?: string[];
            depends_on?: string[];
        };
    };
    networks: {
        [key: string]: null;
    };
    volumes: {
        [key: string]: null;
    };
};
