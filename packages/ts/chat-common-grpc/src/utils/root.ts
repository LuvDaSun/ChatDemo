import * as path from "path";
import { fileURLToPath } from "url";

export const projectRoot = getProjectRoot();

function getProjectRoot() {
  const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));
  return path.resolve(dirname, "..", "..");
}
