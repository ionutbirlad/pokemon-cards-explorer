import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
// opzionale:
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  {
    ignores: ["dist", "coverage", "storybook-static"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      // React 17+ no need React in scope
      "react/react-in-jsx-scope": "off",

      // Hooks rules (fondamentali)
      ...reactHooks.configs.recommended.rules,

      // a11y base (utile per bonus)
      ...jsxA11y.configs.recommended.rules,

      // Import sorting (opzionale ma fa pulito)
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Prettier come regola ESLint (così il CI fallisce se formato male)
      "prettier/prettier": "error",

      // Qualche regola TS “sensata” per assessment
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    },
  },
  {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
);
