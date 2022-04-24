import React, { useState } from 'react';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

export default function Dashboard() {
	const [showSidebarSection, setShowSidebarSection] = useState(false);

	const handleSidebarBtnClick = () => {
		// toggle the state for now
		setShowSidebarSection(!showSidebarSection);
	};

	return (
		<>
			<Titlebar />
			<Toolbar handleSidebarBtnClick={handleSidebarBtnClick} />
			<ContentArea showSidebarSection={showSidebarSection} />
		</>
	);
}
