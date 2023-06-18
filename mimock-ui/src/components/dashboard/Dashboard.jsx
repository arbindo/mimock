import React, { useState, useEffect } from 'react';
import { mockManagementConstants } from 'constants/globalConstants';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';
import { fetchDefaultPlatformSettings } from 'services/mockManagement/fetchDefaultPlatformSettings.service';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

function Dashboard() {
	// #region Defaults
	const DEFAULT_STATUS = mockManagementConstants.DEFAULT_STATUS;
	// #endregion

	// #region States
	const [showSidebarSection, setShowSidebarSection] = useState(false);
	const [mocksListView, setMocksListView] = useState(DEFAULT_STATUS);
	const [httpMethodFilter, setHttpMethodFilter] = useState('');
	const [sortColumn, setSortColumn] = useState('');
	const [sortDirection, setSortDirection] = useState('');
	const [expectedResponseType, setExpectedResponseType] = useState('');
	const [importCompleted, setImportCompleted] = useState(false);
	// #endregion

	// #region Recoil States
	const [, setPageNumber] = useRecoilState(pageNumberAtom);
	// #endregion

	useEffect(() => {
		// call platform settings service and set the values in the cookies
		fetchDefaultPlatformSettings();

		return () => {
			setPageNumber(0);
		};
	}, []);

	// #endregion

	// #region Handler functions
	const handleOnSidebarBtnClick = () => {
		setShowSidebarSection(!showSidebarSection);
	};

	const handleOnMockListsViewChange = (view) => {
		setPageNumber(0);
		setMocksListView(view);
	};

	const handleOnClearFilterClick = () => {
		setPageNumber(0);
		setMocksListView(DEFAULT_STATUS);
		setHttpMethodFilter('');
		setSortColumn('');
		setSortDirection('');
		setExpectedResponseType('');
	};

	const handleOnBadgeClick = (httpMethod) => {
		setPageNumber(0);
		setHttpMethodFilter((prevHttpMethod) => {
			if (prevHttpMethod === httpMethod) {
				// this means the same tag is clicked twice, so clear the tag
				return '';
			}
			return httpMethod;
		});
	};

	const handleOnChangeSortSelector = (sortColumn) => {
		setPageNumber(0);
		setSortColumn(sortColumn);
	};

	const handleOnClickSortDirection = (sortOrder) => {
		setPageNumber(0);
		setSortDirection(sortOrder);
	};

	const handleOnChangeResponseTypeFilter = (responseTypeFilter) => {
		setPageNumber(0);
		setExpectedResponseType(responseTypeFilter);
	};

	const handleOnImportCompleted = (importCompleted) => {
		setPageNumber(0);
		setImportCompleted(importCompleted);
	};

	// #endregion

	return (
		<>
			<Titlebar />
			<Toolbar
				handleOnSidebarBtnClick={handleOnSidebarBtnClick}
				handleOnMockListsViewChange={handleOnMockListsViewChange}
				mocksListView={mocksListView}
			/>
			<ContentArea
				showSidebarSection={showSidebarSection}
				mocksListView={mocksListView}
				httpMethodFilter={httpMethodFilter}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				expectedResponseType={expectedResponseType}
				importCompleted={importCompleted}
				handleOnClearFilterClick={handleOnClearFilterClick}
				handleOnBadgeClick={handleOnBadgeClick}
				handleOnChangeSortSelector={handleOnChangeSortSelector}
				handleOnClickSortDirection={handleOnClickSortDirection}
				handleOnChangeResponseTypeFilter={handleOnChangeResponseTypeFilter}
				handleOnImportCompleted={handleOnImportCompleted}
			/>
		</>
	);
}

export default Dashboard;
