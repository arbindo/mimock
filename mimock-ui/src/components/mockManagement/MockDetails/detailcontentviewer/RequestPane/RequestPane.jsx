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
import { constants } from './constants';

function RequestPane({
	requestHeader,
	matchExact,
	requestBody,
	requestBodyType,
}) {
	// #region Common Hooks
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	// #endregion

	return (
		<NavTabPane data-testid={constants.testIds.requestNavTabPane}>
			<ContentItem>
				<ItemLabel>{constants.labels.requestHeaders}</ItemLabel>
				<ItemPreFormat data-testid={constants.testIds.requestHeaders}>
					<Code>{requestHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.requestHeadersMatchExact}</ItemLabel>
				<Item
					data-testid={constants.testIds.requestHeadersMatchExact}
					type={constants.defaultFieldType}
					defaultValue={matchExact}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.requestBody}</ItemLabel>
				<ItemPreFormat data-testid={constants.testIds.requestBody}>
					<Code>{requestBody}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.requestBodyType}</ItemLabel>
				<Item
					data-testid={constants.testIds.requestBodyType}
					type={constants.defaultFieldType}
					defaultValue={requestBodyType}
					disabled
					readOnly
				/>
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
