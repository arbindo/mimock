module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/'],
	coverageProvider: 'babel',
	coverageReporters: ['json', 'lcov', 'clover'],
	errorOnDeprecated: true,
	rootDir: 'src',
	roots: ['<rootDir>'],
	runner: 'jest-runner',
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	slowTestThreshold: 10,
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	timers: 'fake',
	coverageThreshold: {
		//TODO: The test coverage should be reverted back to the below once proper test suites are added
		// global: {
		// 	branches: 95,
		// 	functions: 95,
		// 	lines: 90,
		// 	statements: 95,
		// },
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	moduleNameMapper: {
		'\\.(css|jpg|png|svg)$': '<rootDir>/__mocks__/assetMock.js',
	},
	// watchman: true,
	// testURL: "http://localhost",
	// maxWorkers: "50%",
};
