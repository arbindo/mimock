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
	// #region Defaults
	const { title, placeholders, additionalStyles, testIds } = constants;
	// #endregion
	return (
		<>
			<TitlebarContainer data-testid={testIds.titlebarContainer}>
				<IconHeader
					dataTestId={testIds.mocksHeader}
					icon={<FaCopy />}
					title={title}
					additionalStyles={additionalStyles.mocksHeader}
				/>
				<TitlebarInnerContainer data-testid={testIds.titlebarInnerContainer}>
					<SearchField
						data-testid={testIds.searchField}
						placeholder={placeholders.search}
					/>
				</TitlebarInnerContainer>
			</TitlebarContainer>
		</>
	);
}

export default Titlebar;
