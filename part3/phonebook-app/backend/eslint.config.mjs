import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js"
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"},
    plugins: {
      import: stylisticJs
    }
  },
  {languageOptions: { globals: globals.node }},
  {ignores: ["dist/**", "node_modules/**"]}
];