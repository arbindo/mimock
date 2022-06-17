import React from 'react';
import { NavTabPane, ContentItem, ItemLabel, Item } from './GeneralPane.style';
import PropTypes from 'prop-types';

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
		<NavTabPane data-testid='general-pane-section'>
			<ContentItem>
				<ItemLabel>Mock Unique Identifier</ItemLabel>
				<Item type='text' defaultValue={uniqueId} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Mock Name</ItemLabel>
				<Item type='text' defaultValue={mockName} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Description</ItemLabel>
				<Item type='text' defaultValue={description} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Status</ItemLabel>
				<Item type='text' defaultValue={entityStatus} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>HTTP Method</ItemLabel>
				<Item type='text' defaultValue={httpMethod} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Route</ItemLabel>
				<Item type='text' defaultValue={route} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Query Params</ItemLabel>
				<Item type='text' defaultValue={queryParams} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Expected Status Code</ItemLabel>
				<Item type='text' defaultValue={statusCode} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Created By</ItemLabel>
				<Item type='text' defaultValue={createdBy} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Created At</ItemLabel>
				<Item type='text' defaultValue={createdAt} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Last Modified By</ItemLabel>
				<Item type='text' defaultValue={modifiedBy} disabled readOnly />
			</ContentItem>
			<ContentItem>
				<ItemLabel>Last Modified At</ItemLabel>
				<Item type='text' defaultValue={updatedAt} disabled readOnly />
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
