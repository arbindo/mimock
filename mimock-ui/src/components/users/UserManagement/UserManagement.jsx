import React from 'react';
import { UserManagementWrapper } from './UserManagement.style';
import Header from './Header';
import UserTable from './UsersTable';

export default function UserManagement() {
	return (
		<UserManagementWrapper data-testid='user-management'>
			<Header />
			<UserTable />
		</UserManagementWrapper>
	);
}
