import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
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
