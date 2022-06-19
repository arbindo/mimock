import React from 'react';
import {
	TitlebarContainer,
	TitlebarInnerContainer,
	SearchField,
} from './Titlebar.style';
import { constants } from './constants';
import { FaCopy } from 'react-icons/fa';
import IconHeader from 'styles/IconHeader';

function Titlebar() {
	return (
		<>
			<TitlebarContainer data-testid={constants.testIds.titlebarContainer}>
				<IconHeader
					dataTestId={constants.testIds.mocksHeader}
					icon={<FaCopy />}
					title={constants.title}
					additionalStyles={constants.additionalStyles.mocksHeader}
				/>
				<TitlebarInnerContainer
					data-testid={constants.testIds.titlebarInnerContainer}
				>
					<SearchField
						data-testid={constants.testIds.searchField}
						placeholder={constants.placeholders.search}
					/>
				</TitlebarInnerContainer>
			</TitlebarContainer>
		</>
	);
}

export default Titlebar;
