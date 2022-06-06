import React from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import IconHeader from 'styles/IconHeader';
import { AddUserWrapper, AddUserHeader } from './AddUser.style';

export default function AddUser() {
	return (
		<AddUserWrapper data-testid='add-new-user'>
			<AddUserHeader>
				<IconHeader
					dataTestId='add-user-header'
					icon={<IoPersonAdd />}
					title='Add New User'
				/>
			</AddUserHeader>
		</AddUserWrapper>
	);
}
