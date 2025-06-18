import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import {addDirective} from "rollup-plugin-add-directive"

import packageJson from "./package.json" with { type: "json" }

export default [
  // ESM and CommonJS builds
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist",
        outDir: "./dist",
      }),
      addDirective({
        directive: "'use client'",
      }),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
]
