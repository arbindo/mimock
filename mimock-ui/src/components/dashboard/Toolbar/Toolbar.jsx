import React from 'react';
import {
	ToolbarContainer,
	ToolbarInnerContainer,
	AddMockButton,
	MoreToolsMockButton,
	SelectComponent,
	SelectOptionComponent,
	SelectLabel,
	SelectWrapper,
} from './Toolbar.style';
import { constants } from './constants';
import PropTypes from 'prop-types';

function Toolbar({ handleSidebarBtnClick }) {
	const handleAddMockBtnClick = () => {
		console.log('Clicked add icon button');
	};

	return (
		<>
			<ToolbarContainer data-testid='toolbar-section'>
				<MoreToolsMockButton
					dataTestid='more-tools-btn'
					background='bg-gray-500'
					label={constants.label.sidebar}
					color='text-white'
					additionalStyles='h-10 mx-auto my-auto rounded-sm text-sm'
					onclickHandler={handleSidebarBtnClick}
				></MoreToolsMockButton>
				<ToolbarInnerContainer>
					<SelectWrapper>
						<SelectLabel htmlFor='sort-element'>
							{constants.label.sort}
						</SelectLabel>
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
					</SelectWrapper>
					<SelectWrapper>
						<SelectLabel htmlFor='group-element'>
							{constants.label.group}
						</SelectLabel>
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
					</SelectWrapper>
					<AddMockButton
						dataTestid='add-btn'
						background='bg-teal-500'
						label={constants.label.add}
						color='text-white'
						width='w-1/6'
						additionalStyles='h-10 ml-8 mr-2 mt-5 mb-2 px-2 py-1 rounded-sm text-sm'
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
