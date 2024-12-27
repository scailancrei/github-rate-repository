// eslint.config.js
import js from "@eslint/js"
import globals from "globals"
import babelParser from "@babel/eslint-parser"
export default [
  js.configs.recommended,
  {
    plugins: {
      React: ["react"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      "react/prop-types": "off",
      semi: "never",
    },
  },
]
