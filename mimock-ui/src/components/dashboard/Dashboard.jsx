import React, { useState } from 'react';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';
import { mockManagementConstants } from 'constants/globalConstants';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';

export default function Dashboard() {
	const DEFAULT_STATUS = mockManagementConstants.DEFAULT_STATUS;
	const [showSidebarSection, setShowSidebarSection] = useState(false);
	const [mocksListView, setMocksListView] = useState(DEFAULT_STATUS);
	const [, setPageNumber] = useRecoilState(pageNumberAtom);

	const handleSidebarBtnClick = () => {
		// toggle the state for now
		setShowSidebarSection(!showSidebarSection);
	};

	const handleMockListsView = (view) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// set mocks view
		setMocksListView(view);
	};

	const handleClearFilter = () => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// reset mocks to DEFAULT_STATUS
		setMocksListView(DEFAULT_STATUS);
	};

	return (
		<>
			<Titlebar />
			<Toolbar
				handleSidebarBtnClick={handleSidebarBtnClick}
				handleMockListsView={handleMockListsView}
				mocksListView={mocksListView}
			/>
			<ContentArea
				showSidebarSection={showSidebarSection}
				mocksListView={mocksListView}
				handleClearFilter={handleClearFilter}
			/>
		</>
	);
}
