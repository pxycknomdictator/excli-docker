#!/usr/bin/env node

import { getUserInputs } from "./cli";
import { setupDocker, setupEnv } from "./generators";

async function main() {
    const config = getUserInputs();
    await Promise.all([setupDocker(config), setupEnv(config)]);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
