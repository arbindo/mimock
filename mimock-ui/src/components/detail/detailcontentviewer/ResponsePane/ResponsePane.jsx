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

function ResponsePane({ responseHeader, contentType, responseBody }) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<NavTabPane data-testid='response-pane-section'>
			<ContentItem>
				<ItemLabel>Response Header</ItemLabel>
				<ItemPreFormat>
					<Code>{responseHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>Response Content Type</ItemLabel>
				<Item type='text' defaultValue={contentType} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Expected Response</ItemLabel>
				<ItemPreFormat>
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
