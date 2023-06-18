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
	SortIconsWrapper,
	SortIcons,
} from './Sidebar.style.js';
import { constants } from './constants';
import {
	FaCogs,
	FaFileDownload,
	FaSortAmountUp,
	FaSortAmountDown,
} from 'react-icons/fa';
import { exportMocks } from 'services/mockManagement/exportMock.service';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
import { notificationTypes } from 'constants/notificationConstants';
import useNotification from 'hooks/useNotification';
import fileDownload from 'js-file-download';
import { importMocks } from 'src/api/services/mockManagement/importMock.service.js';

function Sidebar({
	handleOnBadgeClick,
	isFilterCleared,
	isSortColumnCleared,
	isExpectedResponseTypeCleared,
	handleOnChangeSortSelector,
	handleOnClickSortDirection,
	handleOnChangeResponseTypeFilter,
	handleOnImportCompleted,
}) {
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
	const sortSelectorRef = useRef();
	const sortIconsWrapperRef = useRef();
	const expectedResponseTypeRef = useRef([]);

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

	useEffect(() => {
		if (isSortColumnCleared) {
			sortSelectorRef.current.value = '';
			sortIconsWrapperRef.current.classList.add('hidden');
		} else {
			sortIconsWrapperRef.current.classList.remove('hidden');
		}
	}, [isSortColumnCleared]);

	useEffect(() => {
		if (isExpectedResponseTypeCleared) {
			for (
				let index = 0;
				index < Object.keys(expectedResponseTypeRef).length - 1;
				index++
			) {
				const element = expectedResponseTypeRef[index];
				element.checked = false;
			}
		}
	}, [isExpectedResponseTypeCleared]);
	// #endregion

	// #region Handler functions
	const handleOnChangeResponseTypeRadio = (e) => {
		e.target.checked = true;
		handleOnChangeResponseTypeFilter(e.target.value);
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

	const handleImportMocksBtnClick = ({ target: { files } }) => {
		let formData = new FormData();
		formData.append('file', files[0]);
		importMocks(formData)
			.then((res) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Import success',
					message: res.data,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
				handleOnImportCompleted(true);
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to import mocks',
					message: err.response.data.message,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const handleOnChangeSelect = (e) => {
		handleOnChangeSortSelector(e.target.value);
	};

	const handleOnChangeSortDirection = (e) => {
		let sortDirection = e.target.name;
		if (sortDirection === undefined) {
			sortDirection = e.target.parentElement.name;
		}
		handleOnClickSortDirection(sortDirection);
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
							onChange={handleImportMocksBtnClick}
							type='file'
						></ImportMocksButton>
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
								ref={(element) => (expectedResponseTypeRef[key] = element)}
								type='radio'
								defaultChecked={false}
								value={item.value}
								onChange={handleOnChangeResponseTypeRadio}
								name={`${name.responseType}`}
								data-testid={`${testIds.responseType}${key}`}
								id={`${ids.responseType}${key}`}
							></RadioComponent>
							<RadioOptionText htmlFor={`${ids.responseType}${key}`}>
								{item.label}
							</RadioOptionText>
						</FormCheckWrapper>
					))}
				</ComponentWrapper>
				<ComponentWrapper data-testid={testIds.sortSelectComponent}>
					<ComponentLabel
						htmlFor={ids.sortSelect}
						className={'inline-flex justify-between'}
					>
						{label.sortSelect}
						<SortIconsWrapper ref={sortIconsWrapperRef}>
							<SortIcons onClick={handleOnChangeSortDirection} name='asc'>
								<FaSortAmountUp /> ASC
							</SortIcons>
							<SortIcons onClick={handleOnChangeSortDirection} name='desc'>
								<FaSortAmountDown /> DESC
							</SortIcons>
						</SortIconsWrapper>
					</ComponentLabel>
					<SelectComponent
						id={ids.sortSelect}
						data-testid={testIds.sortSelect}
						onChange={handleOnChangeSelect}
						defaultValue=''
						ref={sortSelectorRef}
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{sortSelectItems.map((item, key) => (
							<SelectOptionComponent key={key} value={item.value}>
								{item.label}
							</SelectOptionComponent>
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
	isSortColumnCleared: PropTypes.bool.isRequired,
	isExpectedResponseTypeCleared: PropTypes.bool.isRequired,
	handleOnChangeSortSelector: PropTypes.func.isRequired,
	handleOnClickSortDirection: PropTypes.func.isRequired,
	handleOnChangeResponseTypeFilter: PropTypes.func.isRequired,
	handleOnImportCompleted: PropTypes.func.isRequired,
};

export default Sidebar;
