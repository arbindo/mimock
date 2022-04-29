import React from 'react';
import {
	TitlebarContainer,
	TitlebarInnerContainer,
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
				<TitleSpan>
					<FaCopy />
					<Title>{constants.title}</Title>
				</TitleSpan>
				<TitlebarInnerContainer>
					<SearchField placeholder={constants.placeholders.search} />
				</TitlebarInnerContainer>
			</TitlebarContainer>
		</>
	);
}

export default Titlebar;
