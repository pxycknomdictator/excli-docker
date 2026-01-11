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
