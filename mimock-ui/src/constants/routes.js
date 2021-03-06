const root = '/mimock-ui';
const adminPrefix = `${root}/admin`;
const manageMocksPrefix = `${root}/mocks/manage`;

export const routes = {
	root,
	adminPrefix,
	mocks: {
		path: `${root}/mocks`,
		secured: true,
	},
	mocksDetail: {
		path: `${root}/mocks/detail/*`,
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
	manageRoutes: {
		addMock: {
			path: `${manageMocksPrefix}/add-mock`,
			secured: true,
		},
		editMock: {
			path: `${manageMocksPrefix}/edit-mock`,
			secured: true,
		},
	},
	adminRoutes: {
		users: {
			path: `${adminPrefix}/users`,
			secured: true,
		},
		editUsers: {
			path: `${adminPrefix}/users/edit`,
			secured: true,
		},
		addUser: {
			path: `${adminPrefix}/users/add-user`,
			secured: true,
		},
	},
};
