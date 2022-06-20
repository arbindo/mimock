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
	return (
		<NavTabPane data-testid={constants.testIds.generalNavTabPane}>
			<ContentItem>
				<ItemLabel>{constants.labels.mockId}</ItemLabel>
				<Item
					data-testid={constants.testIds.mockId}
					type={constants.defaultFieldType}
					defaultValue={uniqueId}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.mockName}</ItemLabel>
				<Item
					data-testid={constants.testIds.mockName}
					type={constants.defaultFieldType}
					defaultValue={mockName}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.description}</ItemLabel>
				<Item
					data-testid={constants.testIds.description}
					type={constants.defaultFieldType}
					defaultValue={description}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.entityStatus}</ItemLabel>
				<Item
					data-testid={constants.testIds.entityStatus}
					type={constants.defaultFieldType}
					defaultValue={entityStatus}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.httpMethod}</ItemLabel>
				<Item
					data-testid={constants.testIds.httpMethod}
					type={constants.defaultFieldType}
					defaultValue={httpMethod}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.route}</ItemLabel>
				<Item
					data-testid={constants.testIds.route}
					type={constants.defaultFieldType}
					defaultValue={route}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.queryParams}</ItemLabel>
				<Item
					data-testid={constants.testIds.queryParams}
					type={constants.defaultFieldType}
					defaultValue={queryParams}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.statusCode}</ItemLabel>
				<Item
					data-testid={constants.testIds.statusCode}
					type={constants.defaultFieldType}
					defaultValue={statusCode}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.createdBy}</ItemLabel>
				<Item
					data-testid={constants.testIds.createdBy}
					type={constants.defaultFieldType}
					defaultValue={createdBy}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.createdAt}</ItemLabel>
				<Item
					data-testid={constants.testIds.createdAt}
					type={constants.defaultFieldType}
					defaultValue={createdAt}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.lastModifiedBy}</ItemLabel>
				<Item
					data-testid={constants.testIds.lastModifiedBy}
					type={constants.defaultFieldType}
					defaultValue={modifiedBy}
					disabled
					readOnly
				/>
			</ContentItem>
			<ContentItem>
				<ItemLabel>{constants.labels.lastModifiedAt}</ItemLabel>
				<Item
					data-testid={constants.testIds.lastModifiedAt}
					type={constants.defaultFieldType}
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
