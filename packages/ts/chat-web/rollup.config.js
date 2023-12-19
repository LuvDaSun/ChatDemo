import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "out/browser.js",
  output: {
    file: "./bundle/browser.js",
    format: "iife",
    sourcemap: "inline",
    name: "application",
  },

  context: "window",

  plugins: [nodeResolve({ browser: true, mainFields: ["browser"] }), commonjs()],
});
