const CracoAlias = require('craco-alias');

module.exports = {
	reactScriptsVersion: 'react-scripts',
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'jsconfig',
				baseUrl: './',
			},
		},
	],
	babel: {
		presets: [],
		plugins: ['babel-plugin-jsx-control-statements'],
	},
	eslint: {
		enable: false,
	},
	jest: {
		babel: {
			addPresets: true,
			addPlugins: true,
		},
		configure: {
			clearMocks: true,
			coverageDirectory: 'coverage',
			coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
			coverageProvider: 'v8',
			coverageReporters: ['json', 'lcov', 'clover'],
			testEnvironment: 'node',
			testMatch: ['**/**/*.test.js'],
			testPathIgnorePatterns: ['\\\\node_modules\\\\'],
			moduleNameMapper: {
				'^src(.*)$': '<rootDir>/src$1',
				'^config(.*)$': '<rootDir>/src/config$1',
				'^components(.*)$': '<rootDir>/src/components$1',
				'^App(.*)$': '<rootDir>/src$1',
				'^assets(.*)$': '<rootDir>/src/assets$1',
				'^common(.*)$': '<rootDir>/src/common$1',
				'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
					'<rootDir>/src/__mocks__/fileMock.js',
			},
		},
	},
};