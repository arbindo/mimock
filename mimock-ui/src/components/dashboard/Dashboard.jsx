import React, { useState, useEffect } from 'react';
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
	const [httpMethodFilter, setHttpMethodFilter] = useState('')

	useEffect(() => {
		return () => {
			// reset page number back to 0 when component unmounts
			setPageNumber(0);
		};
	}, []);

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
		// reset httpMethod filter to ''
		setHttpMethodFilter('')
	};

	const handleOnBadgeClick = (httpMethod) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// set http method
		setHttpMethodFilter((prevHttpMethod) => {
			if(prevHttpMethod === httpMethod){
				// this means the same tag is clicked twice, so clear the tag
				return '';
			}
			return httpMethod;
		})
	}

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
				httpMethodFilter={httpMethodFilter}
				handleClearFilter={handleClearFilter}
				handleOnBadgeClick={handleOnBadgeClick}
			/>
		</>
	);
}
