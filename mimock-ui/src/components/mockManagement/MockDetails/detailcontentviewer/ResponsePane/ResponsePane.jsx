import React, { useEffect } from 'react';
import {
	NavTabPane,
	ContentItem,
	ItemLabel,
	Item,
	ItemPreFormat,
	Code,
} from './ResponsePane.style';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import { constants } from './constants';

function ResponsePane({ responseHeader, contentType, responseBody }) {
	// #region Common Hooks
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	// #endregion

	return (
		<NavTabPane data-testid={constants.testIds.responseNavTabPane}>
			<ContentItem>
				<ItemLabel>{constants.labels.responseHeader}</ItemLabel>
				<ItemPreFormat data-testid={constants.testIds.responseHeader}>
					<Code>{responseHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.responseContentType}</ItemLabel>
				<Item
					data-testid={constants.testIds.responseContentType}
					type={constants.defaultFieldType}
					defaultValue={contentType}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.expectedResponse}</ItemLabel>
				<ItemPreFormat data-testid={constants.testIds.expectedResponse}>
					<Code>{responseBody}</Code>
				</ItemPreFormat>
			</ContentItem>
		</NavTabPane>
	);
}

ResponsePane.propTypes = {
	responseHeader: PropTypes.string.isRequired,
	contentType: PropTypes.string.isRequired,
	responseBody: PropTypes.string.isRequired,
};

export default ResponsePane;
