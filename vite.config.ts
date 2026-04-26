import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    tanstackStart(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          typeof warning.message === "string" &&
          warning.message.includes("node_modules")
        ) {
          return;
        }

        if (
          warning.code === "UNUSED_EXTERNAL_IMPORT" &&
          typeof warning.message === "string" &&
          warning.message.includes("node_modules")
        ) {
          return;
        }

        warn(warning);
      },
    },
  },
});
