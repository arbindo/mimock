import React from 'react';
import { NavTabPane, ContentItem, ItemLabel, Item } from './GeneralPane.style';
import PropTypes from 'prop-types';
import { constants } from './constants';

function GeneralPane({
	uniqueId,
	mockName,
	description,
	entityStatus,
	httpMethod,
	route,
	queryParams,
	statusCode,
	createdBy,
	createdAt,
	modifiedBy,
	updatedAt,
}) {
	// #region Defaults
	const { testIds, labels, defaultFieldType } = constants;
	// #endregion

	return (
		<NavTabPane data-testid={testIds.generalNavTabPane}>
			<ContentItem>
				<ItemLabel>{labels.mockId}</ItemLabel>
				<Item
					data-testid={testIds.mockId}
					type={defaultFieldType}
					defaultValue={uniqueId}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.mockName}</ItemLabel>
				<Item
					data-testid={testIds.mockName}
					type={defaultFieldType}
					defaultValue={mockName}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.description}</ItemLabel>
				<Item
					data-testid={testIds.description}
					type={defaultFieldType}
					defaultValue={description}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.entityStatus}</ItemLabel>
				<Item
					data-testid={testIds.entityStatus}
					type={defaultFieldType}
					defaultValue={entityStatus}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.httpMethod}</ItemLabel>
				<Item
					data-testid={testIds.httpMethod}
					type={defaultFieldType}
					defaultValue={httpMethod}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.route}</ItemLabel>
				<Item
					data-testid={testIds.route}
					type={defaultFieldType}
					defaultValue={route}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.queryParams}</ItemLabel>
				<Item
					data-testid={testIds.queryParams}
					type={defaultFieldType}
					defaultValue={queryParams}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.statusCode}</ItemLabel>
				<Item
					data-testid={testIds.statusCode}
					type={defaultFieldType}
					defaultValue={statusCode}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.createdBy}</ItemLabel>
				<Item
					data-testid={testIds.createdBy}
					type={defaultFieldType}
					defaultValue={createdBy}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.createdAt}</ItemLabel>
				<Item
					data-testid={testIds.createdAt}
					type={defaultFieldType}
					defaultValue={createdAt}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.lastModifiedBy}</ItemLabel>
				<Item
					data-testid={testIds.lastModifiedBy}
					type={defaultFieldType}
					defaultValue={modifiedBy}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{labels.lastModifiedAt}</ItemLabel>
				<Item
					data-testid={testIds.lastModifiedAt}
					type={defaultFieldType}
					defaultValue={updatedAt}
					disabled
					readOnly
				/>
			</ContentItem>
		</NavTabPane>
	);
}

GeneralPane.propTypes = {
	uniqueId: PropTypes.string.isRequired,
	mockName: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	entityStatus: PropTypes.string.isRequired,
	httpMethod: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	queryParams: PropTypes.string.isRequired,
	statusCode: PropTypes.number.isRequired,
	createdBy: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	modifiedBy: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired,
};

export default GeneralPane;
