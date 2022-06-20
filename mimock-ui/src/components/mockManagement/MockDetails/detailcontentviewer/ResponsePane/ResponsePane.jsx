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
	// #region Defaults
	const { testIds, labels, defaultFieldType } = constants;
	// #endregion

	// #region Common Hooks
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	// #endregion

	return (
		<NavTabPane data-testid={testIds.responseNavTabPane}>
			<ContentItem>
				<ItemLabel>{labels.responseHeader}</ItemLabel>
				<ItemPreFormat data-testid={testIds.responseHeader}>
					<Code>{responseHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.responseContentType}</ItemLabel>
				<Item
					data-testid={testIds.responseContentType}
					type={defaultFieldType}
					defaultValue={contentType}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.expectedResponse}</ItemLabel>
				<ItemPreFormat data-testid={testIds.expectedResponse}>
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
