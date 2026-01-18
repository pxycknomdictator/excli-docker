import type { Config } from "../types";
import { yargsInput } from "./yargs";
import { interactiveInput } from "./prompts";

export async function getUserInputs(): Promise<Config> {
    const args = process.argv.slice(2);
    if (args.length > 0) return yargsInput();
    return interactiveInput();
}
