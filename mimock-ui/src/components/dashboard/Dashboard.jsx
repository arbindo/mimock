import React, { useState } from 'react';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

export default function Dashboard() {
	const [showSidebarSection, setShowSidebarSection] = useState(false);
	const [mocksListView, setMocksListView] = useState('');

	const handleSidebarBtnClick = () => {
		// toggle the state for now
		setShowSidebarSection(!showSidebarSection);
	};

	const handleMockListsView = (view) => {
		// set mocks view
		setMocksListView(view);
	};

	const handleClearFilter = () => {
		// reset mocks view
		setMocksListView('');
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
