import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/hand-synth-project/" : "/", // GitHub Pages の場合はリポジトリ名

    build: {
        outDir: "docs",
    },
    plugins: [
        copy({
            targets: [
                {
                    src: "src/mediapipe_models/**/*",
                    dest: "dist/mediapipe_models",
                },
            ],
            hook: "buildEnd",
            verbose: true,
        }),
    ],
});