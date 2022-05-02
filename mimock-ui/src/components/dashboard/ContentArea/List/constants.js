import { mockManagementConstants } from 'constants/globalConstants';

export const constants = {
	label: {
		clearFilter: 'Clear Filter',
	},
	view: {
		active: `${mockManagementConstants.ACTIVE_STATUS}`,
		archived: `${mockManagementConstants.ARCHIVED_STATUS}`,
		deleted: `${mockManagementConstants.DELETED_STATUS}`,
	},
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
		emptyState: 'No mocks to display!!!',
	},
};
