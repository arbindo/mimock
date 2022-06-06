import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import IconHeader from 'styles/IconHeader';
import { IconButtonVariants } from 'styles/Button';
import { routes } from 'constants/routes';
import { UserManagementHeader, AddButton } from './Header.style';

export default function Header() {
	const navigate = useNavigate();

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
				onclickHandler={() => {
					navigate(routes.adminRoutes.addUser.path);
				}}
			/>
		</UserManagementHeader>
	);
}
