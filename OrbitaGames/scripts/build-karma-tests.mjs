// Convierte JSX a JavaScript e instrumenta src/ para medir qué código ejecutan las pruebas.
import { build } from "esbuild";
import { transformAsync } from "@babel/core";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";

await mkdir(".tests", { recursive: true });
await build({
  entryPoints: ["tests/index.jsx"],
  outfile: ".tests/bundle.js",
  bundle: true,
  format: "iife",
  jsx: "automatic",
  sourcemap: "inline",
  define: { "process.env.NODE_ENV": '"test"' },
  plugins: [
    {
      name: "coverage",
      setup(builder) {
        builder.onLoad(
          { filter: /[\\/]src[\\/].*\.(js|jsx)$/ },
          async ({ path: filename }) => {
            const source = await readFile(filename, "utf8");
            const result = await transformAsync(source, {
              filename,
              parserOpts: { plugins: ["jsx"] },
              plugins: [
                [
                  "babel-plugin-istanbul",
                  { include: ["src/**/*"], exclude: [] },
                ],
              ],
              sourceMaps: "inline",
              configFile: false,
              babelrc: false,
            });
            return {
              contents: result.code,
              loader: "jsx",
              resolveDir: path.dirname(filename),
            };
          },
        );
      },
    },
  ],
});
