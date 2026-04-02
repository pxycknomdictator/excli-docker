import { buildCmd, installCmd, lockFiles } from "../config";
import type { Config } from "../types";

export function getTypeScriptDockerfile(config: Config): string {
    const { packageManager } = config;

    return `# Building stage
FROM node:24 AS builder
WORKDIR /build

COPY package.json ${lockFiles[packageManager]} tsconfig.json ./

RUN ${installCmd[packageManager]}

COPY . /build

RUN ${buildCmd[packageManager]}

# Production stage
FROM node:24-alpine AS production
WORKDIR /app

COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/dist /app/dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
`;
}

export function getJavaScriptDockerfile(config: Config): string {
    const { packageManager } = config;

    return `# Building stage
FROM node:24 AS builder
WORKDIR /build

COPY package.json ${lockFiles[packageManager]} ./

RUN ${installCmd[packageManager]}

COPY . /build

# Production stage
FROM node:24-alpine AS production
WORKDIR /app

COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/src /app/src

EXPOSE 3000

CMD ["node", "dist/main.js"]
`;
}

export function getDockerfile(config: Config): string {
    return config.language === "ts"
        ? getTypeScriptDockerfile(config)
        : getJavaScriptDockerfile(config);
}
