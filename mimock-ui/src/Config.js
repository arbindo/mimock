export const config = {
	hostName: {
		development: 'http://localhost:8080',
		production: `${window.location.protocol}//${window.location.host}`,
		ci: 'https://localhost:8080',
	},
};
