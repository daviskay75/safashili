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
      // Disable unescaped entities rule for content-heavy psychology website
      "react/no-unescaped-entities": "off",
      // Allow any types for external APIs and libraries
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unused vars for development flexibility
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow require imports for compatibility
      "@typescript-eslint/no-require-imports": "off",
      // Allow prefer-const warnings instead of errors
      "prefer-const": "warn",
      // Relax exhaustive deps for complex effects
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];

export default eslintConfig;
