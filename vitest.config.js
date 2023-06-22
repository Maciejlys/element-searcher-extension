import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    test: {
      exclude: ["packages/template/*", "node_modules/**"],
    },
  })
);
