import React from 'react';
import {
	TitlebarContainer,
	Title,
	TitleSpan,
	SearchField,
} from './Titlebar.style';
import { constants } from './constants';
import { FaCopy } from 'react-icons/fa';

function Titlebar() {
	return (
		<>
			<TitlebarContainer data-testid='titlebar-section'>
				<Title>
					<TitleSpan>
						<FaCopy /> {constants.title}
					</TitleSpan>
				</Title>
				<SearchField placeholder={constants.placeholders.search} />
			</TitlebarContainer>
			<hr />
		</>
	);
}

export default Titlebar;
