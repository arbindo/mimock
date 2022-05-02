import { mockManagementConstants } from 'constants/globalConstants';

export const constants = {
	label: {
		add: 'Add Mock',
		sidebar: 'Tools',
		generalView: 'Active',
		archivedView: 'Archived',
		recycleBinView: 'Bin',
	},
	name: {
		generalView: `${mockManagementConstants.ACTIVE_STATUS}`,
		archivedView: `${mockManagementConstants.ARCHIVED_STATUS}`,
		recycleBinView: `${mockManagementConstants.DELETED_STATUS}`,
	},
};
