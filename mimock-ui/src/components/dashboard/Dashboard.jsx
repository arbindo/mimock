import React, { useState, useEffect, useRef } from 'react';
import { Cookies } from 'react-cookie';
import {
	globalConstants,
	mockManagementConstants,
} from 'constants/globalConstants';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';
import { listPlatformSettings } from 'services/mockManagement/platformSettings.service';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

export default function Dashboard() {
	// #region Defaults
	const cookies = new Cookies();
	const DEFAULT_STATUS = mockManagementConstants.DEFAULT_STATUS;
	// #endregion Defaults

	// #region States
	const [showSidebarSection, setShowSidebarSection] = useState(false);
	const [mocksListView, setMocksListView] = useState(DEFAULT_STATUS);
	const [httpMethodFilter, setHttpMethodFilter] = useState('');
	// #endregion States

	// #region Recoil States
	const [, setPageNumber] = useRecoilState(pageNumberAtom);
	// #endregion Recoil States

	// #region Common Hooks
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
		async function callPlatformSettingsService() {
			const response = await listPlatformSettings(authCookieRef);
			if (response != null && response.status == 200) {
				return response.data[0];
			}
			return null;
		}
		// call platform settings service and set the values in the cookies
		callPlatformSettingsService()
			.then((res) => {
				cookies.set(globalConstants.PLATFORM_SETTINGS_COOKIE_NAME, res);
			})
			.catch((err) => console.log(err));
		return () => {
			// reset page number back to 0 when this component unmounts
			// (since the default value reset is required for useLazyLoad hook)
			setPageNumber(0);
		};
	}, []);

	// #endregion Common Hooks

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
	// #endregion Handler functions

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
				handleOnClearFilterClick={handleOnClearFilterClick}
				handleOnBadgeClick={handleOnBadgeClick}
			/>
		</>
	);
}
