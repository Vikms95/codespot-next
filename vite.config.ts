import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  test: {
    include: ["**/*.test.tsx"],
    globals: true,
  },
});
