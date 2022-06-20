import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	SideBarContainer,
	SidebarBox,
	TitleSpan,
	SpanText,
	SelectComponent,
	SelectOptionComponent,
	FormCheckWrapper,
	RadioComponent,
	RadioOptionText,
	BadgeFilter,
	ComponentLabel,
	ComponentWrapper,
	RowComponentWrapper,
	MiniBtnSpan,
	ExportMocksButton,
	ImportMocksButton,
} from './Sidebar.style.js';
import { constants } from './constants';
import { FaCogs, FaFileDownload, FaFileUpload } from 'react-icons/fa';
import { exportMocks } from 'services/mockManagement/exportMock.service';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { notificationTypes } from 'constants/notificationConstants';
import useNotification from 'hooks/useNotification';
import fileDownload from 'js-file-download';

function Sidebar({ handleOnBadgeClick, isFilterCleared }) {
	// #region Defaults
	const cookies = new Cookies();
	const totalBadgeFilterCount = constants.badgeFilterItems.length;
	// #endregion

	// #region Common Hooks
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');
	const badgeRef = useRef([]);

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		if (isFilterCleared) {
			for (var i = 0; i < totalBadgeFilterCount; i++) {
				const currentClasses =
					constants.badgeFilterItems[i].badgeColor.split(' ');
				const activeClasses =
					constants.badgeFilterItems[i].activeBadgeColor.split(' ');
				activeClasses.forEach((classes) => {
					badgeRef[i].classList.remove(classes);
				});
				currentClasses.forEach((classes) => {
					badgeRef[i].classList.add(classes);
				});
			}
		}
	}, [isFilterCleared]);
	// #endregion

	// #region Handler functions
	const handleOnchange = (e) => {
		console.log(e);
	};

	const handleHttpMethodBadgeClick = (key, item) => {
		const currentBadge = badgeRef[key];
		const otherBadges = Object.keys(badgeRef)
			.filter((index) => index != key)
			.reduce((obj, key) => {
				obj[key] = badgeRef[key];
				return obj;
			}, {});
		const currentClasses = item.badgeColor.split(' ');
		const activeClasses = item.activeBadgeColor.split(' ');
		currentClasses.forEach((classes) => {
			currentBadge.classList.remove(classes);
		});
		activeClasses.forEach((classes) => {
			currentBadge.classList.add(classes);
		});
		for (var i = 0; i < totalBadgeFilterCount; i++) {
			const currentClasses =
				constants.badgeFilterItems[i].badgeColor.split(' ');
			const activeClasses =
				constants.badgeFilterItems[i].activeBadgeColor.split(' ');
			if (i !== key) {
				activeClasses.forEach((classes) => {
					otherBadges[i].classList.remove(classes);
				});
				currentClasses.forEach((classes) => {
					otherBadges[i].classList.add(classes);
				});
			}
		}
		handleOnBadgeClick(item.httpMethod);
	};

	const handleExportMocksBtnClick = () => {
		exportMocks(authCookieRef)
			.then((res) => {
				const fileName =
					res.headers['content-disposition'].split('; filename=')[1];
				fileDownload(res.data, fileName);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Export success',
					message: `Exported mocks successfully. Check the downloaded file ${fileName}.`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
				return res.data;
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to export mocks',
					message: err.response.data.message,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};
	// #endregion

	return (
		<SideBarContainer data-testid={constants.testIds.sidebarContainer}>
			<SidebarBox>
				<TitleSpan data-testid={constants.testIds.sidebarHeader}>
					<FaCogs /> <SpanText>{constants.headerTitle}</SpanText>
				</TitleSpan>
				<ComponentWrapper data-testid={constants.testIds.exportImportComponent}>
					<ComponentLabel>
						{constants.label.exportImportComponent}
					</ComponentLabel>
					<RowComponentWrapper>
						<ExportMocksButton
							data-testid={constants.testIds.exportMocksBtn}
							id={constants.ids.exportMocksBtn}
							name={constants.name.exportMocksBtn}
							onClick={handleExportMocksBtnClick}
							title={constants.title.exportMocksBtn}
						>
							<MiniBtnSpan>
								<FaFileDownload /> {constants.label.exportMocksBtn}
							</MiniBtnSpan>
						</ExportMocksButton>
						<ImportMocksButton
							data-testid={constants.testIds.importMocksBtn}
							id={constants.ids.importMocksBtn}
							name={constants.name.importMocksBtn}
							title={constants.title.importMocksBtn}
						>
							<MiniBtnSpan>
								<FaFileUpload /> {constants.label.importMocksBtn}
							</MiniBtnSpan>
						</ImportMocksButton>
					</RowComponentWrapper>
				</ComponentWrapper>
				<ComponentWrapper data-testid={constants.testIds.badgeFilterComponent}>
					<ComponentLabel>{constants.label.badgeFilter}</ComponentLabel>
					<RowComponentWrapper>
						{constants.badgeFilterItems.map((item, key) => (
							<BadgeFilter
								data-testid={`${constants.testIds.badgeFilter}${key}`}
								id={`${constants.ids.badgeFilter}${key}`}
								key={key}
								className={item.badgeColor}
								ref={(element) => (badgeRef[key] = element)}
								onClick={() => handleHttpMethodBadgeClick(key, item)}
							>
								{item.httpMethod}
							</BadgeFilter>
						))}
					</RowComponentWrapper>
				</ComponentWrapper>
				<ComponentWrapper data-testid={constants.testIds.responseTypeComponent}>
					<ComponentLabel>{constants.label.responseType}</ComponentLabel>
					{constants.responseTypeItems.map((item, key) => (
						<FormCheckWrapper key={key}>
							<RadioComponent
								type='radio'
								value=''
								onChange={handleOnchange}
								name={`${constants.name.responseType}${key}`}
								data-testid={`${constants.testIds.responseType}${key}`}
								id={`${constants.ids.responseType}${key}`}
							></RadioComponent>
							<RadioOptionText htmlFor={`${constants.ids.responseType}${key}`}>
								{item}
							</RadioOptionText>
						</FormCheckWrapper>
					))}
				</ComponentWrapper>
				<ComponentWrapper data-testid={constants.testIds.sortSelectComponent}>
					<ComponentLabel htmlFor={constants.ids.sortSelect}>
						{constants.label.sortSelect}
					</ComponentLabel>
					<SelectComponent
						id={constants.ids.sortSelect}
						data-testid={constants.testIds.sortSelect}
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{constants.sortSelectItems.map((item, key) => (
							<SelectOptionComponent key={key}>{item}</SelectOptionComponent>
						))}
					</SelectComponent>
				</ComponentWrapper>
			</SidebarBox>
		</SideBarContainer>
	);
}

Sidebar.propTypes = {
	handleOnBadgeClick: PropTypes.func.isRequired,
	isFilterCleared: PropTypes.bool.isRequired,
};

export default Sidebar;
