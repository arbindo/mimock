module.exports = {
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		node: true,
		jest: true,
		'jsx-control-statements/jsx-control-statements': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jsx-control-statements/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'jest', 'jsx-control-statements'],
	rules: {
		'no-unused-vars': 'error',
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'jsx-control-statements/jsx-choose-not-empty': 1,
		'jsx-control-statements/jsx-for-require-each': 1,
		'jsx-control-statements/jsx-for-require-of': 1,
		'jsx-control-statements/jsx-if-require-condition': 1,
		'jsx-control-statements/jsx-otherwise-once-last': 1,
		'jsx-control-statements/jsx-use-if-tag': 1,
		'jsx-control-statements/jsx-when-require-condition': 1,
		'jsx-control-statements/jsx-jcs-no-undef': 1,
		'react/jsx-no-undef': [2, { allowGlobals: true }],
	},
	settings: {
		react: {
			version: '17.0.2',
		},
	},
};