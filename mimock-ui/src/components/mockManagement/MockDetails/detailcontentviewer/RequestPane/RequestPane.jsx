import React, { useEffect } from 'react';
import {
	NavTabPane,
	ContentItem,
	ItemLabel,
	Item,
	ItemPreFormat,
	Code,
} from './RequestPane.style';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

function RequestPane({
	requestHeader,
	matchExact,
	requestBody,
	requestBodyType,
}) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<NavTabPane data-testid='request-pane-section'>
			<ContentItem>
				<ItemLabel>Request Headers</ItemLabel>
				<ItemPreFormat>
					<Code>{requestHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>Request Headers Match Exact</ItemLabel>
				<Item type='text' defaultValue={matchExact} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Request Body</ItemLabel>
				<ItemPreFormat>
					<Code>{requestBody}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>Request Body Type</ItemLabel>
				<Item type='text' defaultValue={requestBodyType} disabled readOnly />
			</ContentItem>
		</NavTabPane>
	);
}

RequestPane.propTypes = {
	requestHeader: PropTypes.string.isRequired,
	matchExact: PropTypes.string.isRequired,
	requestBody: PropTypes.string.isRequired,
	requestBodyType: PropTypes.string.isRequired,
};

export default RequestPane;
