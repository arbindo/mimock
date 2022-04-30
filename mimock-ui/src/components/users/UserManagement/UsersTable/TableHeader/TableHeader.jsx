import React from 'react';
import { TableHeaderWrapper, HeaderItem } from './TableHeader.style';

export default function TableHeader() {
	const headers = [
		{ label: 'Name', key: 'name' },
		{ label: 'User name', key: 'userName' },
		{ label: 'Role', key: 'role' },
		{ label: 'Activation status', key: 'activationStatus' },
		{ label: 'Created on', key: 'createdOn' },
		{ label: 'Actions', key: 'actions' },
	];

	return (
		<TableHeaderWrapper data-testid='user-mgmt-table-header'>
			<For each='header' of={headers}>
				<HeaderItem data-testid={`header-item-${header.key}`} key={header.key}>
					{header.label}
				</HeaderItem>
			</For>
		</TableHeaderWrapper>
	);
}
