import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    server: {
        port: 3000,
    },
    root: "src",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
            },
        },
    },
});