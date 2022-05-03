export const globalConstants = {
	AUTH_TOKEN_COOKIE_NAME: '__authToken',
	XSRF_COOKIE_NAME: 'XSRF-TOKEN',
};

export const mockManagementConstants = {
	DEFAULT_STATUS: 'ALL',
	ACTIVE_STATUS: 'ACTIVE',
	ARCHIVED_STATUS: 'ARCHIVED',
	DELETED_STATUS: 'DELETED',
	headerTitle: {
		all: 'All Mocks',
		active: 'Active Mocks',
		archived: 'Archived Mocks',
		deleted: 'Deleted Mocks',
	},
	errors: {
		unexpectedState:
			'Server responded with unexpected status. Unable To List Mocks !!',
		serverError: 'Unable To Reach Server, Contact your system admin!!',
	},
};
