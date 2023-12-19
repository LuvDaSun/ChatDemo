import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
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

  plugins: [
    nodeResolve({ browser: true, mainFields: ["browser"] }),
    commonjs(),
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "globalThis.process.env.NODE_ENV": JSON.stringify("production"),
      },
      preventAssignment: true,
    }),
  ],
});
