// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import css from '@eslint/css'
import eslintConfigPrettier from '@vue/eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/build/',
            '**/.output/',
            '**/.nuxt/',
            '**/*.min.js',
            '**/.encore',
            '**/coverage/',
            '**/_generated/',
            '**/.pnpm-store/',
            '**/database.ts',
            '**/*.sql',
            '**/ui-bak/'
        ]
    },

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        plugins: { js },
        extends: ['js/recommended']
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },

    tseslint.configs.recommended,

    {
        files: ['**/*.json', '**/*.jsonc'],
        plugins: { json },
        language: 'json/jsonc',
        extends: ['json/recommended'],
        rules: {
            'json/no-duplicate-keys': 'error',
            'json/no-comments': 'off'
        }
    },
    {
        files: ['**/*.json5'],
        plugins: { json },
        language: 'json/json5',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended']
    },

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        rules: {
            // Add non-stylistic JS rules or overrides here if needed
            // e.g., 'no-unused-vars': 'warn',
            'no-unused-vars': 'warn',
            'prefer-promise-reject-errors': 'off',
            'prefer-arrow-callback': [
                'error',
                { allowNamedFunctions: true, allowUnboundThis: false }
            ]
        }
    },

    pluginVue.configs['flat/base'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/attribute-hyphenation': ['error', 'always'],
            'vue/attributes-order': [
                'error',
                {
                    alphabetical: false,
                    order: [
                        'DEFINITION',
                        'LIST_RENDERING',
                        'CONDITIONALS',
                        'RENDER_MODIFIERS',
                        'GLOBAL',
                        ['UNIQUE', 'SLOT'],
                        'TWO_WAY_BINDING',
                        'OTHER_DIRECTIVES',
                        'OTHER_ATTR',
                        'EVENTS',
                        'CONTENT'
                    ]
                }
            ],
            'vue/component-name-in-template-casing': [
                'error',
                'kebab-case',
                {
                    registeredComponentsOnly: false
                }
            ],
            'vue/custom-event-name-casing': ['error', 'kebab-case'],
            'vue/no-reserved-keys': 0,
            'vue/no-unused-components': 'warn',
            'vue/order-in-components': [
                'error',
                {
                    order: [
                        'el',
                        'name',
                        'parent',
                        'functional',
                        ['delimiters', 'comments'],
                        ['components', 'directives', 'filters'],
                        'extends',
                        'mixins',
                        'inheritAttrs',
                        'model',
                        ['props', 'propsData'],
                        'methods',
                        'computed',
                        'LIFECYCLE_HOOKS',
                        [
                            'beforeCreate',
                            'created',
                            'beforeMount',
                            'mounted',
                            'beforeUpdate',
                            'updated',
                            'activated',
                            'deactivated',
                            'beforeDestroy',
                            'destroyed'
                        ],
                        'watch',
                        ['template', 'render'],
                        'renderError',
                        'data'
                    ]
                }
            ],
            'vue/prop-name-casing': ['error', 'camelCase'],
            'vue/v-slot-style': [
                'error',
                {
                    atComponent: 'v-slot',
                    default: 'shorthand',
                    named: 'shorthand'
                }
            ],
            'vue/v-on-event-hyphenation': ['error', 'always'],
            indent: 'off',
            '@typescript-eslint/indent': 'off'
        }
    },
    eslintConfigPrettier
])
