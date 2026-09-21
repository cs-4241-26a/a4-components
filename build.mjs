import * as esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

await esbuild.build({
    entryPoints: ["src/client/app.js"],
    mainFields: ["svelte", "browser", "module", "main"],
    conditions: ["svelte", "browser"],
    bundle: true,
    plugins: [sveltePlugin()],
    logLevel: "info",
    minify: true,
    sourcemap: true,
    outfile: 'static/index.js',
    format: "esm"
});