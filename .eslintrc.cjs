module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended"],
  ignorePatterns: ["node_modules", "dist", ".next", "*.cjs"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: ["eslint:recommended"],
    },
  ],
};
