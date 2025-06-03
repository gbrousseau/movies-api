module.exports = [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: require("@typescript-eslint/parser"),
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                process: "readonly",
                console: "readonly",
                __dirname: "readonly",
                __filename: "readonly"
            }
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off"
        },
        ignores: ["node_modules", "dist"]
    }
];
