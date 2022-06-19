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
	const activeClassList = [
		'bg-teal-500',
		'text-white',
		'text-semibold',
		'hover:bg-gray-500',
		'hover-bg-opacity-5',
		'hover:text-teal-500',
	];
	// #endregion Defaults

	// #region States
	const [hideAddMockBtn, setHideAddMockBtn] = useState(false);
	// #endregion States

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
			const activeMockBtn = document.getElementById(
				constants.ids.activeMocksViewButton
			);
			const archivedMockBtn = document.getElementById(
				constants.ids.archivedMocksViewButton
			);
			const deletedMockBtn = document.getElementById(
				constants.ids.recycleBinMocksViewButton
			);
			activeMockBtn.classList.remove(...activeClassList);
			archivedMockBtn.classList.remove(...activeClassList);
			deletedMockBtn.classList.remove(...activeClassList);
		}
	}, [mocksListView]);
	// #endregion Common Hooks

	// #region Handler functions
	const handleAddMockBtnClick = () => {
		navigate(routes.manageRoutes.addMock.path);
	};

	const handleViewMocksBtnClick = (e) => {
		const targetElement = e.target;
		const parentElement = e.target.parentElement;
		let viewName = '';
		const activeMockBtn = document.getElementById(
			constants.ids.activeMocksViewButton
		);
		const archivedMockBtn = document.getElementById(
			constants.ids.archivedMocksViewButton
		);
		const deletedMockBtn = document.getElementById(
			constants.ids.recycleBinMocksViewButton
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
	// #endregion Handler functions

	return (
		<>
			<ToolbarContainer data-testid={constants.testIds.toolbarContainer}>
				<MoreToolsMockButton
					dataTestid={constants.testIds.moreToolsButton}
					id={constants.ids.moreToolsButton}
					background={constants.background.moreToolsButton}
					label={constants.label.moreToolsButton}
					color={constants.color.moreToolsButton}
					icon={<FaCogs />}
					additionalStyles={moreToolsMockButtonAdditonalStyles}
					onclickHandler={handleOnSidebarBtnClick}
				></MoreToolsMockButton>
				<ToolbarInnerContainer
					data-testid={constants.testIds.toolbarInnerContainer}
				>
					<ViewMocksWrapper
						data-testid={constants.testIds.viewMocksWrapper}
						id={constants.ids.viewMocksWrapper}
					>
						<ViewMocksInnerWrapper>
							<ActiveMocksViewButton
								dataTestid={constants.testIds.activeMocksViewButton}
								id={constants.ids.activeMocksViewButton}
								background={constants.background.activeMocksViewButton}
								label={constants.label.generalView}
								color={constants.color.activeMocksViewButton}
								icon={<MdDone name={constants.name.generalView} />}
								additionalStyles={activeMocksViewButtonAdditionalStyles}
								name={constants.name.generalView}
								onclickHandler={handleViewMocksBtnClick}
							></ActiveMocksViewButton>
							<ArchivedMocksViewButton
								dataTestid={constants.testIds.archivedMocksViewButton}
								id={constants.ids.archivedMocksViewButton}
								background={constants.background.archivedMocksViewButton}
								label={constants.label.archivedView}
								color={constants.color.archivedMocksViewButton}
								icon={<MdArchive name={constants.name.archivedView} />}
								additionalStyles={archivedMocksViewButtonAdditionalStyles}
								name={constants.name.archivedView}
								onclickHandler={handleViewMocksBtnClick}
							></ArchivedMocksViewButton>
							<RecycleBinViewButton
								dataTestid={constants.testIds.recycleBinMocksViewButton}
								id={constants.ids.recycleBinMocksViewButton}
								background={constants.background.recycleBinMocksViewButton}
								label={constants.label.recycleBinView}
								color={constants.color.recycleBinMocksViewButton}
								icon={<MdDelete name={constants.name.recycleBinView} />}
								additionalStyles={recycleBinViewButtonAdditionalStyles}
								name={constants.name.recycleBinView}
								onclickHandler={handleViewMocksBtnClick}
							></RecycleBinViewButton>
						</ViewMocksInnerWrapper>
					</ViewMocksWrapper>
					<If condition={!hideAddMockBtn}>
						<AddMockButton
							dataTestid={constants.testIds.addMockButton}
							id={constants.ids.addMockButton}
							background={constants.background.addMockButton}
							label={constants.label.add}
							color={constants.color.addMockButton}
							icon={<FaPlusSquare />}
							additionalStyles={addMocksButtonAdditionalStyles}
							onclickHandler={handleAddMockBtnClick}
						></AddMockButton>
					</If>
				</ToolbarInnerContainer>
			</ToolbarContainer>
			<hr data-testid={constants.testIds.divider} />
		</>
	);
}

Toolbar.propTypes = {
	handleOnSidebarBtnClick: PropTypes.func.isRequired,
	handleOnMockListsViewChange: PropTypes.func.isRequired,
	mocksListView: PropTypes.string.isRequired,
};

export default Toolbar;
