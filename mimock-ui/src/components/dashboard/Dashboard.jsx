import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import {
	globalConstants,
	mockManagementConstants,
} from 'constants/globalConstants';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';
import { fetchDefaultPlatformSettings } from 'services/mockManagement/fetchDefaultPlatformSettings.service';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

function Dashboard() {
	// #region Defaults
	const cookies = new Cookies();
	const DEFAULT_STATUS = mockManagementConstants.DEFAULT_STATUS;
	// #endregion

	// #region States
	const [showSidebarSection, setShowSidebarSection] = useState(false);
	const [mocksListView, setMocksListView] = useState(DEFAULT_STATUS);
	const [httpMethodFilter, setHttpMethodFilter] = useState('');
	const [sortColumn, setSortColumn] = useState('');
	const [sortDirection, setSortDirection] = useState('');
	// #endregion

	// #region Recoil States
	const [, setPageNumber] = useRecoilState(pageNumberAtom);
	// #endregion

	// #region Common Hooks
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
		async function callFetchDefaultPlatformSettings() {
			const response = await fetchDefaultPlatformSettings(authCookieRef);
			return response;
		}
		// call platform settings service and set the values in the cookies
		callFetchDefaultPlatformSettings()
			.then((res) => {
				// just call this API to fetch default settings and store in the cookies
				console.log(res);
			})
			.catch((err) => console.log(err));
		return () => {
			// reset page number back to 0 when this component unmounts
			// (since the default value reset is required for useLazyLoad hook)
			setPageNumber(0);
		};
	}, []);

	// #endregion

	// #region Handler functions
	const handleOnSidebarBtnClick = () => {
		// toggle the state for now
		setShowSidebarSection(!showSidebarSection);
	};

	const handleOnMockListsViewChange = (view) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// set mocks view
		setMocksListView(view);
	};

	const handleOnClearFilterClick = () => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// reset mocks to DEFAULT_STATUS
		setMocksListView(DEFAULT_STATUS);
		// reset httpMethod filter to ''
		setHttpMethodFilter('');
		// reset sortColumn to ''
		setSortColumn('');
		// reset sortDirection to ''
		setSortDirection('');
	};

	const handleOnBadgeClick = (httpMethod) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		// set http method
		setHttpMethodFilter((prevHttpMethod) => {
			if (prevHttpMethod === httpMethod) {
				// this means the same tag is clicked twice, so clear the tag
				return '';
			}
			return httpMethod;
		});
	};

	const handleOnChangeSortSelector = (sortColumn) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		setSortColumn(sortColumn);
	};

	const handleOnClickSortDirection = (sortOrder) => {
		// set page number back to 0 (since view is changed)
		setPageNumber(0);
		setSortDirection(sortOrder);
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
				handleOnClearFilterClick={handleOnClearFilterClick}
				handleOnBadgeClick={handleOnBadgeClick}
				handleOnChangeSortSelector={handleOnChangeSortSelector}
				handleOnClickSortDirection={handleOnClickSortDirection}
			/>
		</>
	);
}

export default Dashboard;
