module.exports = {
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', style: 'camelCase' },
    ],
    // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', style: 'kebab-case' },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        // AirBnB Styleguide rules
        'airbnb-typescript/base',
        // Settings for Prettier
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.base.json',
      },
      rules: {
        '@typescript-eslint/lines-between-class-members': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'lines-between-class-members': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@angular-eslint/component-selector': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
      },
    },
    {
      files: ['projects/list-form-control-example/**/*.spec.ts', 'projects/list-form-control-example/**/*.d.ts'],
      parserOptions: {
        project: './projects/list-form-control-example/tsconfig.spec.json',
      },
      // Jasmine rules
      extends: ['plugin:jasmine/recommended'],
      // Plugin to run Jasmine rules
      plugins: ['jasmine'],
      env: { jasmine: true },
    },
    {
      files: ['projects/list-form-control-example/**/*.e2e-spec.ts', 'projects/list-form-control-example/**/*.po.ts'],
      parserOptions: {
        project: './projects/list-form-control-example/e2e/tsconfig.json',
      },
      extends: ['plugin:protractor/recommended'],
      plugins: ['protractor'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    {
      files: ['projects/list-form-control/**/*.spec.ts', 'projects/list-form-control/**/*.d.ts'],
      parserOptions: {
        project: './projects/list-form-control/tsconfig.spec.json',
      },
      // Jasmine rules
      extends: ['plugin:jasmine/recommended'],
      // Plugin to run Jasmine rules
      plugins: ['jasmine'],
      env: { jasmine: true },
    },
    {
      files: ['projects/list-form-control/**/*.e2e-spec.ts', 'projects/list-form-control/**/*.po.ts'],
      parserOptions: {
        project: './projects/list-form-control/e2e/tsconfig.json',
      },
      extends: ['plugin:protractor/recommended'],
      plugins: ['protractor'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
};
