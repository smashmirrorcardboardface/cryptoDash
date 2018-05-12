module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": ["error", { allow: ["warn", "error", "info"] }]
  }
};
