import React from 'react';
import {
	ToolbarContainer,
	AddMockButton,
	FilterMockButton,
} from './Toolbar.style';
import { IconButtonVariants } from 'styles/Button';

function Toolbar() {
	const handleAddMockBtnClick = () => {
		console.log('Clicked add icon button');
	};

	return (
		<>
			<ToolbarContainer data-testid='toolbar-section'>
				<FilterMockButton
					label='Filter Mock'
					variant={IconButtonVariants.FilterButton}
					onclickHandler={handleAddMockBtnClick}
				></FilterMockButton>
				<AddMockButton
					label='Add Mock'
					variant={IconButtonVariants.AddButton}
					onclickHandler={handleAddMockBtnClick}
				></AddMockButton>
			</ToolbarContainer>
			<hr />
		</>
	);
}

export default Toolbar;
