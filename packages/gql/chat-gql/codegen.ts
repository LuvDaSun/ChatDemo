import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",

  generates: {
    "out/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
