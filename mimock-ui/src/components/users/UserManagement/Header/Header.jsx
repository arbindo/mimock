import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import IconHeader from 'styles/IconHeader';
import { IconButtonVariants } from 'styles/Button';
import { UserManagementHeader, AddButton } from './Header.style';

export default function Header() {
	return (
		<UserManagementHeader>
			<IconHeader
				dataTestId='user-management-header'
				icon={<FaUserAlt />}
				title='User Management'
			/>
			<AddButton
				dataTestid='add-user-btn'
				label='ADD USER'
				variant={IconButtonVariants.AddButton}
			/>
		</UserManagementHeader>
	);
}
