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
	const {
		headerTitle,
		title,
		label,
		name,
		ids,
		testIds,
		sortSelectItems,
		responseTypeItems,
		badgeFilterItems,
	} = constants;
	const totalBadgeFilterCount = badgeFilterItems.length;
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
				const currentClasses = badgeFilterItems[i].badgeColor.split(' ');
				const activeClasses = badgeFilterItems[i].activeBadgeColor.split(' ');
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
			const currentClasses = badgeFilterItems[i].badgeColor.split(' ');
			const activeClasses = badgeFilterItems[i].activeBadgeColor.split(' ');
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
		<SideBarContainer data-testid={testIds.sidebarContainer}>
			<SidebarBox>
				<TitleSpan data-testid={testIds.sidebarHeader}>
					<FaCogs /> <SpanText>{headerTitle}</SpanText>
				</TitleSpan>
				<ComponentWrapper data-testid={testIds.exportImportComponent}>
					<ComponentLabel>{label.exportImportComponent}</ComponentLabel>
					<RowComponentWrapper>
						<ExportMocksButton
							data-testid={testIds.exportMocksBtn}
							id={ids.exportMocksBtn}
							name={name.exportMocksBtn}
							onClick={handleExportMocksBtnClick}
							title={title.exportMocksBtn}
						>
							<MiniBtnSpan>
								<FaFileDownload /> {label.exportMocksBtn}
							</MiniBtnSpan>
						</ExportMocksButton>
						<ImportMocksButton
							data-testid={testIds.importMocksBtn}
							id={ids.importMocksBtn}
							name={name.importMocksBtn}
							title={title.importMocksBtn}
						>
							<MiniBtnSpan>
								<FaFileUpload /> {label.importMocksBtn}
							</MiniBtnSpan>
						</ImportMocksButton>
					</RowComponentWrapper>
				</ComponentWrapper>
				<ComponentWrapper data-testid={testIds.badgeFilterComponent}>
					<ComponentLabel>{label.badgeFilter}</ComponentLabel>
					<RowComponentWrapper>
						{badgeFilterItems.map((item, key) => (
							<BadgeFilter
								data-testid={`${testIds.badgeFilter}${key}`}
								id={`${ids.badgeFilter}${key}`}
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
				<ComponentWrapper data-testid={testIds.responseTypeComponent}>
					<ComponentLabel>{label.responseType}</ComponentLabel>
					{responseTypeItems.map((item, key) => (
						<FormCheckWrapper key={key}>
							<RadioComponent
								type='radio'
								value=''
								onChange={handleOnchange}
								name={`${name.responseType}${key}`}
								data-testid={`${testIds.responseType}${key}`}
								id={`${ids.responseType}${key}`}
							></RadioComponent>
							<RadioOptionText htmlFor={`${ids.responseType}${key}`}>
								{item}
							</RadioOptionText>
						</FormCheckWrapper>
					))}
				</ComponentWrapper>
				<ComponentWrapper data-testid={testIds.sortSelectComponent}>
					<ComponentLabel htmlFor={ids.sortSelect}>
						{label.sortSelect}
					</ComponentLabel>
					<SelectComponent
						id={ids.sortSelect}
						data-testid={testIds.sortSelect}
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{sortSelectItems.map((item, key) => (
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
