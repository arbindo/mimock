const root = '/mimock-ui';
const adminPrefix = `${root}/admin`;

export const routes = {
	root,
	adminPrefix,
	mocks: {
		path: `${root}/mocks`,
		secured: true,
	},
	settings: {
		path: `${root}/settings`,
		secured: true,
	},
	profile: {
		path: `${root}/profile`,
		secured: true,
	},
	logout: {
		path: `${root}/logout`,
		secured: true,
	},
	adminRoutes: {
		users: {
			path: `${adminPrefix}/users`,
			secured: true,
		},
	},
};
