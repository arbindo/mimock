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
	GeneralMocksViewButton,
	ArchivedMocksViewButton,
	RecycleBinViewButton,
	generalMocksViewButtonAdditionalStyles,
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
	handleSidebarBtnClick,
	handleMockListsView,
	mocksListView,
}) {
	const activeClassList = [
		'bg-teal-500',
		'text-white',
		'text-semibold',
		'hover:bg-gray-500',
		'hover-bg-opacity-5',
		'hover:text-teal-500',
	];
	const navigate = useNavigate();

	const [hideAddMockBtn, setHideAddMockBtn] = useState(false);

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
	});

	useEffect(() => {
		if (mocksListView == mockManagementConstants.DEFAULT_STATUS) {
			const activeMockBtn = document.getElementById('active-view-btn');
			const archivedMockBtn = document.getElementById('archived-view-btn');
			const deletedMockBtn = document.getElementById('deleted-view-btn');
			activeMockBtn.classList.remove(...activeClassList);
			archivedMockBtn.classList.remove(...activeClassList);
			deletedMockBtn.classList.remove(...activeClassList);
		}
	}, [mocksListView]);

	const handleAddMockBtnClick = () => {
		navigate(routes.manageRoutes.addMock.path);
	};

	const handleViewMocksBtnClick = (e) => {
		const targetElement = e.target;
		const parentElement = e.target.parentElement;
		let viewName = '';
		const activeMockBtn = document.getElementById('active-view-btn');
		const archivedMockBtn = document.getElementById('archived-view-btn');
		const deletedMockBtn = document.getElementById('deleted-view-btn');
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
		handleMockListsView(viewName);
	};

	return (
		<>
			<ToolbarContainer data-testid='toolbar-section'>
				<MoreToolsMockButton
					dataTestid='more-tools-btn'
					background='bg-white'
					label={constants.label.sidebar}
					color='text-gray-500'
					icon={<FaCogs />}
					additionalStyles={moreToolsMockButtonAdditonalStyles}
					onclickHandler={handleSidebarBtnClick}
				></MoreToolsMockButton>
				<ToolbarInnerContainer>
					<ViewMocksWrapper>
						<ViewMocksInnerWrapper role='group'>
							<GeneralMocksViewButton
								dataTestid='active-view-btn'
								id='active-view-btn'
								background='bg-white'
								label={constants.label.generalView}
								color='text-gray-500'
								icon={<MdDone name={constants.name.generalView} />}
								additionalStyles={generalMocksViewButtonAdditionalStyles}
								name={constants.name.generalView}
								onclickHandler={handleViewMocksBtnClick}
							></GeneralMocksViewButton>
							<ArchivedMocksViewButton
								dataTestid='archived-view-btn'
								id='archived-view-btn'
								background='bg-white'
								label={constants.label.archivedView}
								color='text-gray-500'
								icon={<MdArchive name={constants.name.archivedView} />}
								additionalStyles={archivedMocksViewButtonAdditionalStyles}
								name={constants.name.archivedView}
								onclickHandler={handleViewMocksBtnClick}
							></ArchivedMocksViewButton>
							<RecycleBinViewButton
								dataTestid='deleted-view-btn'
								id='deleted-view-btn'
								background='bg-white'
								label={constants.label.recycleBinView}
								color='text-gray-500'
								icon={<MdDelete name={constants.name.recycleBinView} />}
								additionalStyles={recycleBinViewButtonAdditionalStyles}
								name={constants.name.recycleBinView}
								onclickHandler={handleViewMocksBtnClick}
							></RecycleBinViewButton>
						</ViewMocksInnerWrapper>
					</ViewMocksWrapper>
					<If condition={!hideAddMockBtn}>
						<AddMockButton
							dataTestid='add-btn'
							background='bg-teal-500'
							label={constants.label.add}
							color='text-white'
							icon={<FaPlusSquare />}
							additionalStyles={addMocksButtonAdditionalStyles}
							onclickHandler={handleAddMockBtnClick}
						></AddMockButton>
					</If>
				</ToolbarInnerContainer>
			</ToolbarContainer>
			<hr />
		</>
	);
}

Toolbar.propTypes = {
	handleSidebarBtnClick: PropTypes.func.isRequired,
	handleMockListsView: PropTypes.func.isRequired,
	mocksListView: PropTypes.string.isRequired,
};

export default Toolbar;
