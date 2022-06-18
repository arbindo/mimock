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

function Sidebar({ onBadgeClick, isFilterCleared }) {
	const cookies = new Cookies();
	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	const badgeRef = useRef([]);
	const totalBadgeFilterCount = constants.badgeFilterItems.length;

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
		onBadgeClick(item.httpMethod);
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

	return (
		<SideBarContainer data-testid='sidebar-section'>
			<SidebarBox>
				<TitleSpan>
					<FaCogs /> <SpanText>{constants.headerTitle}</SpanText>
				</TitleSpan>
				<ComponentWrapper>
					<ComponentLabel>{constants.label.exportImport}</ComponentLabel>
					<RowComponentWrapper>
						<ExportMocksButton
							data-testid='export-mocks-btn'
							onClick={handleExportMocksBtnClick}
							title={constants.title.exportBtn}
						>
							<MiniBtnSpan>
								<FaFileDownload /> {constants.label.exportMocksBtn}
							</MiniBtnSpan>
						</ExportMocksButton>
						<ImportMocksButton
							data-testid='import-mocks-btn'
							title={constants.title.importBtn}
						>
							<MiniBtnSpan>
								<FaFileUpload /> {constants.label.importMocksBtn}
							</MiniBtnSpan>
						</ImportMocksButton>
					</RowComponentWrapper>
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel>{constants.label.badgefilter}</ComponentLabel>
					<RowComponentWrapper>
						{constants.badgeFilterItems.map((item, key) => (
							<BadgeFilter
								data-testid='card-badge'
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
				<ComponentWrapper>
					<ComponentLabel>{constants.label.radiogroup}</ComponentLabel>
					{constants.radioGroupItems.map((item, key) => (
						<FormCheckWrapper key={key}>
							<RadioComponent
								type='radio'
								value=''
								onChange={handleOnchange}
								name='response-type'
								id={`response-type-${key}`}
							></RadioComponent>
							<RadioOptionText htmlFor={`response-type-${key}`}>
								{item}
							</RadioOptionText>
						</FormCheckWrapper>
					))}
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel htmlFor='sort-element'>
						{constants.label.sort}
					</ComponentLabel>
					<SelectComponent
						id='sort-element'
						data-testid='sort-element'
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{constants.sortItems.map((item, key) => (
							<SelectOptionComponent key={key}>{item}</SelectOptionComponent>
						))}
					</SelectComponent>
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel htmlFor='group-element'>
						{constants.label.group}
					</ComponentLabel>
					<SelectComponent
						id='group-element'
						data-testid='group-element'
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{constants.groupItems.map((item, key) => (
							<SelectOptionComponent key={key}>{item}</SelectOptionComponent>
						))}
					</SelectComponent>
				</ComponentWrapper>
			</SidebarBox>
		</SideBarContainer>
	);
}

Sidebar.propTypes = {
	onBadgeClick: PropTypes.func.isRequired,
	isFilterCleared: PropTypes.bool.isRequired,
};

export default Sidebar;
