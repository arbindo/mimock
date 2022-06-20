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
	// #region Defaults
	const { testIds, labels, defaultFieldType } = constants;
	// #endregion

	// #region Common Hooks
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	// #endregion

	return (
		<NavTabPane data-testid={testIds.requestNavTabPane}>
			<ContentItem>
				<ItemLabel>{labels.requestHeaders}</ItemLabel>
				<ItemPreFormat data-testid={testIds.requestHeaders}>
					<Code>{requestHeader}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.requestHeadersMatchExact}</ItemLabel>
				<Item
					data-testid={testIds.requestHeadersMatchExact}
					type={defaultFieldType}
					defaultValue={matchExact}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.requestBody}</ItemLabel>
				<ItemPreFormat data-testid={testIds.requestBody}>
					<Code>{requestBody}</Code>
				</ItemPreFormat>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.requestBodyType}</ItemLabel>
				<Item
					data-testid={testIds.requestBodyType}
					type={defaultFieldType}
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
