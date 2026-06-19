import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["node_modules/**", "**/*.min.js", "jest-html-reporters-attach/**"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, "@stylistic": stylistic },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
      "no-unassigned-vars": "warn",
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
    },
  },
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs}"],
    languageOptions: { globals: globals.jest },
  },
  {
    files: ["cypress/**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.browser, cy: "readonly", Cypress: "readonly", expect: "readonly", assert: "readonly" } },
    rules: { "no-undef": "off" },
  },
]);
