import React from 'react';
import {
	ToolbarContainer,
	ToolbarInnerContainer,
	AddMockButton,
	MoreToolsMockButton,
} from './Toolbar.style';
import { constants } from './constants';
import PropTypes from 'prop-types';
import { FaCogs, FaPlusSquare } from 'react-icons/fa';

function Toolbar({ handleSidebarBtnClick }) {
	const handleAddMockBtnClick = () => {
		console.log('Clicked add icon button');
	};

	return (
		<>
			<ToolbarContainer data-testid='toolbar-section'>
				<MoreToolsMockButton
					dataTestid='more-tools-btn'
					background='bg-gray-300'
					label={constants.label.sidebar}
					color='text-gray-500'
					icon={<FaCogs />}
					additionalStyles='h-10 mx-4 my-2 rounded-sm text-sm'
					onclickHandler={handleSidebarBtnClick}
				></MoreToolsMockButton>
				<ToolbarInnerContainer>
					<AddMockButton
						dataTestid='add-btn'
						background='bg-teal-500'
						label={constants.label.add}
						color='text-white'
						width='w-1/6'
						icon={<FaPlusSquare />}
						additionalStyles='h-10 ml-8 mr-2 my-2 px-1 py-1 rounded-sm text-sm'
						onclickHandler={handleAddMockBtnClick}
					></AddMockButton>
				</ToolbarInnerContainer>
			</ToolbarContainer>
			<hr />
		</>
	);
}

Toolbar.propTypes = {
	handleSidebarBtnClick: PropTypes.func.isRequired,
};

export default Toolbar;
