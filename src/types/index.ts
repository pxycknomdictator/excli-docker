export type INTERACTIVE_PROMPTS = {
    label: string;
    emoji: string;
    value: string;
};

export type Config = {
    language: "ts" | "js";
    cache?: "redis";
    database: "mysql" | "mariadb" | "sqlite" | "postgres" | "mongodb";
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

type DependsOn =
    | string[]
    | {
          [service: string]: {
              condition: "service_started" | "service_healthy";
          };
      };

type HealthCheck = {
    test: string[];
    interval?: string;
    timeout?: string;
    retries?: number;
};

export type DockerComposeConfig = {
    services: {
        [key: string]: {
            container_name?: string;
            image?: string;
            restart: "unless-stopped";
            ports?: string[];
            environment?: { [key: string]: string };
            networks?: string[];
            volumes?: string[];
            depends_on?: DependsOn;
            healthcheck?: HealthCheck;
        };
    };
    networks?: {
        [key: string]: {};
    };
    volumes?: {
        [key: string]: {};
    };
};
