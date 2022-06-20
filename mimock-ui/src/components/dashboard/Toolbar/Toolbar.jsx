import React, { useEffect, useState } from 'react';
import {
	ToolbarContainer,
	ToolbarInnerContainer,
	AddMockButton,
	addMocksButtonAdditionalStyles,
	MoreToolsMockButton,
	moreToolsMockButtonAdditonalStyles,
	ViewMocksWrapper,
	ViewMocksInnerWrapper,
	ActiveMocksViewButton,
	ArchivedMocksViewButton,
	RecycleBinViewButton,
	activeMocksViewButtonAdditionalStyles,
	archivedMocksViewButtonAdditionalStyles,
	recycleBinViewButtonAdditionalStyles,
} from './Toolbar.style';
import { constants } from './constants';
import PropTypes from 'prop-types';
import { FaCogs, FaPlusSquare } from 'react-icons/fa';
import { MdDone, MdArchive, MdDelete } from 'react-icons/md';
import { mockManagementConstants } from 'constants/globalConstants';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants/routes';
import { getUserDetails } from 'utils/jwtUtils';

function Toolbar({
	handleOnSidebarBtnClick,
	handleOnMockListsViewChange,
	mocksListView,
}) {
	// #region Defaults
	const { label, name, testIds, ids, background, color } = constants;
	const activeClassList = [
		'bg-teal-500',
		'text-white',
		'text-semibold',
		'hover:bg-gray-500',
		'hover-bg-opacity-5',
		'hover:text-teal-500',
	];
	// #endregion

	// #region States
	const [hideAddMockBtn, setHideAddMockBtn] = useState(false);
	// #endregion

	// #region Common Hooks
	const navigate = useNavigate();
	useEffect(() => {
		try {
			const userDetails = getUserDetails();
			const isReadOnlyUser =
				userDetails && userDetails.userRole === 'ROLE_VIEWER';
			setHideAddMockBtn(isReadOnlyUser);
		} catch (e) {
			console.log(e);
			setHideAddMockBtn(false);
		}
	}, []);
	useEffect(() => {
		if (mocksListView == mockManagementConstants.DEFAULT_STATUS) {
			const activeMockBtn = document.getElementById(ids.activeMocksViewButton);
			const archivedMockBtn = document.getElementById(
				ids.archivedMocksViewButton
			);
			const deletedMockBtn = document.getElementById(
				ids.recycleBinMocksViewButton
			);
			activeMockBtn.classList.remove(...activeClassList);
			archivedMockBtn.classList.remove(...activeClassList);
			deletedMockBtn.classList.remove(...activeClassList);
		}
	}, [mocksListView]);
	// #endregion

	// #region Handler functions
	const handleAddMockBtnClick = () => {
		navigate(routes.manageRoutes.addMock.path);
	};

	const handleViewMocksBtnClick = (e) => {
		const targetElement = e.target;
		const parentElement = e.target.parentElement;
		let viewName = '';
		const activeMockBtn = document.getElementById(ids.activeMocksViewButton);
		const archivedMockBtn = document.getElementById(
			ids.archivedMocksViewButton
		);
		const deletedMockBtn = document.getElementById(
			ids.recycleBinMocksViewButton
		);
		activeMockBtn.classList.remove(...activeClassList);
		archivedMockBtn.classList.remove(...activeClassList);
		deletedMockBtn.classList.remove(...activeClassList);
		if (
			targetElement != undefined &&
			parentElement != undefined &&
			targetElement.getAttribute('name') != undefined
		) {
			viewName = targetElement.getAttribute('name');
		} else {
			viewName = parentElement.getAttribute('name');
		}
		switch (viewName) {
			case 'ACTIVE':
				activeMockBtn.classList.add(...activeClassList);
				break;
			case 'ARCHIVED':
				archivedMockBtn.classList.add(...activeClassList);
				break;
			case 'DELETED':
				deletedMockBtn.classList.add(...activeClassList);
				break;
		}
		handleOnMockListsViewChange(viewName);
	};
	// #endregion

	return (
		<>
			<ToolbarContainer data-testid={testIds.toolbarContainer}>
				<MoreToolsMockButton
					dataTestid={testIds.moreToolsButton}
					id={ids.moreToolsButton}
					background={background.moreToolsButton}
					label={label.moreToolsButton}
					color={color.moreToolsButton}
					icon={<FaCogs />}
					additionalStyles={moreToolsMockButtonAdditonalStyles}
					onclickHandler={handleOnSidebarBtnClick}
				></MoreToolsMockButton>
				<ToolbarInnerContainer data-testid={testIds.toolbarInnerContainer}>
					<ViewMocksWrapper
						data-testid={testIds.viewMocksWrapper}
						id={ids.viewMocksWrapper}
					>
						<ViewMocksInnerWrapper>
							<ActiveMocksViewButton
								dataTestid={testIds.activeMocksViewButton}
								id={ids.activeMocksViewButton}
								background={background.activeMocksViewButton}
								label={label.generalView}
								color={color.activeMocksViewButton}
								icon={<MdDone name={name.generalView} />}
								additionalStyles={activeMocksViewButtonAdditionalStyles}
								name={name.generalView}
								onclickHandler={handleViewMocksBtnClick}
							></ActiveMocksViewButton>
							<ArchivedMocksViewButton
								dataTestid={testIds.archivedMocksViewButton}
								id={ids.archivedMocksViewButton}
								background={background.archivedMocksViewButton}
								label={label.archivedView}
								color={color.archivedMocksViewButton}
								icon={<MdArchive name={name.archivedView} />}
								additionalStyles={archivedMocksViewButtonAdditionalStyles}
								name={name.archivedView}
								onclickHandler={handleViewMocksBtnClick}
							></ArchivedMocksViewButton>
							<RecycleBinViewButton
								dataTestid={testIds.recycleBinMocksViewButton}
								id={ids.recycleBinMocksViewButton}
								background={background.recycleBinMocksViewButton}
								label={label.recycleBinView}
								color={color.recycleBinMocksViewButton}
								icon={<MdDelete name={name.recycleBinView} />}
								additionalStyles={recycleBinViewButtonAdditionalStyles}
								name={name.recycleBinView}
								onclickHandler={handleViewMocksBtnClick}
							></RecycleBinViewButton>
						</ViewMocksInnerWrapper>
					</ViewMocksWrapper>
					<If condition={!hideAddMockBtn}>
						<AddMockButton
							dataTestid={testIds.addMockButton}
							id={ids.addMockButton}
							background={background.addMockButton}
							label={label.add}
							color={color.addMockButton}
							icon={<FaPlusSquare />}
							additionalStyles={addMocksButtonAdditionalStyles}
							onclickHandler={handleAddMockBtnClick}
						></AddMockButton>
					</If>
				</ToolbarInnerContainer>
			</ToolbarContainer>
			<hr data-testid={testIds.divider} />
		</>
	);
}

Toolbar.propTypes = {
	handleOnSidebarBtnClick: PropTypes.func.isRequired,
	handleOnMockListsViewChange: PropTypes.func.isRequired,
	mocksListView: PropTypes.string.isRequired,
};

export default Toolbar;
