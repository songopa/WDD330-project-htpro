import { defineConfig } from "vite";
import { resolve, basename, extname } from "path";
import fs from "fs";

function collectHtmlInputs() {
    const inputs = {
        main: resolve(__dirname, "src/index.html"),
    };

    const viewsDir = resolve(__dirname, "src/views");
    if (!fs.existsSync(viewsDir)) return inputs;

    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = resolve(dir, e.name);
            if (e.isDirectory()) {
                walk(full);
            } else if (e.isFile() && extname(e.name).toLowerCase() === ".html") {
                // create a unique name based on relative path from views dir
                const rel = full.replace(viewsDir + "\\", "").replace(/\\/g, "/");
                const name = rel.replace(/\.html$/i, "").replace(/\//g, "-");
                inputs[name] = full;
            }
        }
    }

    walk(viewsDir);
    return inputs;
}

export default defineConfig({
    server: {
        port: 3000,
    },
    root: "src",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: collectHtmlInputs(),
        },
    },
});