import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import * as programs from "./programs/index.js";

const program = yargs(hideBin(process.argv));

// Register all programs here
programs.registerServerProgram(program);

// Run the program
await program.parse();
