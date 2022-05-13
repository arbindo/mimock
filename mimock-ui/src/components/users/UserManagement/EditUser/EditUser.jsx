import React from 'react';
import { IconHeader } from 'src/styles/components';
import { FaEdit } from 'react-icons/fa';
import { EditUserWrapper, EditUserHeader } from './EditUser.style';

export default function EditUser() {
	return (
		<EditUserWrapper data-testid='edit-user'>
			<EditUserHeader>
				<IconHeader
					icon={<FaEdit />}
					title='Edit User'
					dataTestId='edit-user-header'
				/>
			</EditUserHeader>
		</EditUserWrapper>
	);
}
