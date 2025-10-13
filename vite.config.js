import { defineConfig } from "vite";
import { resolve, basename } from "path";
import glob from "glob";

export default defineConfig({
    server: {
        port: 3000,
    },
    root: "src",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: glob.sync("src/views/**/*.html").reduce((inputs, file) => {
                const name = basename(file, ".html").replace(/\//g, "-");
                inputs[name] = resolve(__dirname, file);
                return inputs;
            }, { main: resolve(__dirname, "src/index.html") }),
        },
    },
});