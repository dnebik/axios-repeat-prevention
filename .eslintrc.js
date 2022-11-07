module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  extends: ["airbnb-typescript"],
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/quotes": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "no-undef": "off",
    "prettier/prettier": "error",
  },
};
