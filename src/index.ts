import { setupDocker } from "./utils";
import { setupEnv } from "./generators";
import { getUserInputs } from "./cli/prompts";

async function main() {
    const config = getUserInputs();
    await Promise.all([setupDocker(config), setupEnv(config)]);
}

main().catch((error) => {
    console.error("❌ Error creating project:", error);
    process.exit(1);
});
