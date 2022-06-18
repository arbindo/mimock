import React from 'react';
import { IconHeader } from 'src/styles/components';
import { FaEdit } from 'react-icons/fa';
import { EditUserWrapper, EditUserHeader } from './EditUser.style';
import UserDetails from './UserDetails';

export default function EditUser() {
	return (
		<EditUserWrapper data-testid='edit-user'>
			<EditUserHeader>
				<IconHeader
					icon={<FaEdit />}
					title='Edit User'
					dataTestId='edit-user-header'
					enableBackNavigation={true}
				/>
			</EditUserHeader>
			<UserDetails />
		</EditUserWrapper>
	);
}
