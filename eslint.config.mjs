{
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "next/core-web-vitals"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "eslint-plugin-sonarjs"],
  "root": true,
  "parserOptions": {
      "project": ["tsconfig.json"]
  },
  "rules": {
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
          "error",
          {
              "checksVoidReturn": false
          }
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/ban-ts-comment": [
          "error",
          {
              "ts-expect-error": "allow-with-description",
              "ts-ignore": "allow-with-description",
              "ts-nocheck": "allow-with-description",
              "ts-check": "allow-with-description"
          }
      ],
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/type-annotation-spacing": [
          "error",
          {
              "before": false,
              "after": true,
              "overrides": {
                  "arrow": {
                      "before": true
                  }
              }
          }
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "react/prefer-read-only-props": "error",
      "react/jsx-no-useless-fragment": [
          "error",
          {
              "allowExpressions": true
          }
      ],
      "no-var": "error",
      "prefer-const": "error",
      "func-call-spacing": ["error", "never"],
      "key-spacing": [
          "error",
          {
              "beforeColon": false,
              "afterColon": true
          }
      ],
      "no-debugger": "error",
      "no-dupe-keys": "error",
      "no-with": "error",
      "eqeqeq": ["error", "always"],
      "quotes": [
          "error",
          "single",
          {
              "avoidEscape": true
          }
      ],
      "no-unused-vars": "off",
      "camelcase": "error",
      "no-duplicate-imports": "error",
      "require-await": "error",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/cognitive-complexity": "warn",
      "sonarjs/no-small-switch": "warn"
  }
}