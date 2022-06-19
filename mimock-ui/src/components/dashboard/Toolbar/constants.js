import { mockManagementConstants } from 'constants/globalConstants';

export const constants = {
	label: {
		add: 'Add Mock',
		moreToolsButton: 'Tools',
		generalView: 'Active',
		archivedView: 'Archived',
		recycleBinView: 'Bin',
	},
	name: {
		generalView: `${mockManagementConstants.ACTIVE_STATUS}`,
		archivedView: `${mockManagementConstants.ARCHIVED_STATUS}`,
		recycleBinView: `${mockManagementConstants.DELETED_STATUS}`,
	},
	ids: {
		moreToolsButton: 'more-tools-btn',
		viewMocksWrapper: 'view-mocks-wrapper',
		activeMocksViewButton: 'active-mocks-view-btn',
		archivedMocksViewButton: 'archived-mocks-view-btn',
		recycleBinMocksViewButton: 'recycle-bin-mocks-view-btn',
		addMockButton: 'add-mock-btn',
	},
	testIds: {
		toolbarContainer: 'toolbar-container',
		moreToolsButton: 'more-tools-btn',
		toolbarInnerContainer: 'toolbar-inner-container',
		viewMocksWrapper: 'view-mocks-wrapper',
		activeMocksViewButton: 'active-mocks-view-btn',
		archivedMocksViewButton: 'archived-mocks-view-btn',
		recycleBinMocksViewButton: 'recycle-bin-mocks-view-btn',
		addMockButton: 'add-mock-btn',
		divider: 'toolbar-end-line',
	},
	background: {
		moreToolsButton: 'bg-white',
		activeMocksViewButton: 'bg-white',
		archivedMocksViewButton: 'bg-white',
		recycleBinMocksViewButton: 'bg-white',
		addMockButton: 'bg-teal-500',
	},
	color: {
		moreToolsButton: 'text-gray-500',
		activeMocksViewButton: 'text-gray-500',
		archivedMocksViewButton: 'text-gray-500',
		recycleBinMocksViewButton: 'text-gray-500',
		addMockButton: 'text-white',
	},
};
