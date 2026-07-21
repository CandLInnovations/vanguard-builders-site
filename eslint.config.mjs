import nextConfig from "eslint-config-next";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

const eslintConfig = [
  ...nextConfig,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      // Disable apostrophe/quote escaping rules for better readability
      "react/no-unescaped-entities": "off",
      // Allow unused vars in wizard components (they're interface requirements)
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^(onNext|onBack|isValid|updateData)$"
      }],
      // Allow any type for external APIs and complex configurations
      "@typescript-eslint/no-explicit-any": ["warn", {
        "ignoreRestArgs": true
      }]
    }
  }
];

export default eslintConfig;
