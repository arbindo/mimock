import React from 'react';
import IconHeader from 'styles/IconHeader';
import {
	TitlebarContainer,
	TitlebarInnerContainer,
	SearchField,
} from './Titlebar.style';
import { constants } from './constants';
import { FaCopy } from 'react-icons/fa';

function Titlebar() {
	return (
		<>
			<TitlebarContainer data-testid='titlebar-section'>
				<IconHeader
					dataTestId='mocks-header'
					icon={<FaCopy />}
					title={constants.title}
				/>
				<TitlebarInnerContainer>
					<SearchField placeholder={constants.placeholders.search} />
				</TitlebarInnerContainer>
			</TitlebarContainer>
		</>
	);
}

export default Titlebar;
