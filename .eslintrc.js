module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        project: 'tsconfig.json',
        createDefaultProgram: true,
    },

    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
            },

            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },

            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },

            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    // Index signature
                    'signature',

                    // Fields
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-abstract-field',
                    'protected-abstract-field',
                    'private-abstract-field',

                    'public-field',
                    'protected-field',
                    'private-field',

                    'static-field',
                    'instance-field',
                    'abstract-field',

                    'field',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    'constructor',

                    // Methods
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',

                    'public-abstract-method',
                    'protected-abstract-method',
                    'private-abstract-method',

                    'public-method',
                    'protected-method',
                    'private-method',

                    'static-method',
                    'instance-method',
                    'abstract-method',

                    'method',
                ],
            },
        ],
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-member-accessibility': ['error'],
            },
        },
    ],
};
