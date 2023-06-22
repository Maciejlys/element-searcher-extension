import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  defineConfig({
    test: {
      include: ["./tests/**"],
    },
  })
);
