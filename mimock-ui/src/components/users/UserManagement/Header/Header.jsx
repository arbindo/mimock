import React from 'react';
import { IconButtonVariants } from 'styles/Button';
import { UserManagementHeader, Title, AddButton } from './Header.style';

export default function Header() {
	return (
		<UserManagementHeader>
			<Title data-testid='user-management-header'>User Management</Title>
			<AddButton
				dataTestid='add-user-btn'
				label='ADD USER'
				variant={IconButtonVariants.AddButton}
			/>
		</UserManagementHeader>
	);
}
