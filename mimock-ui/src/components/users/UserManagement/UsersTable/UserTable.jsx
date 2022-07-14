import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getAllUsers } from 'services/users';
import deletionModalAtom from 'atoms/deletionModalAtom';
import UserRow from './UserRow';
import {
	UserTableWrapper,
	Error,
	NoUsers,
	NoUsersIcon,
	NoUserLabel,
} from './UserTable.style';
import TableHeader from './TableHeader/TableHeader';

export default function UserTable() {
	const [gettingUsers, setGettingUsers] = useState(true);
	const [error, setError] = useState(false);
	const [users, setUsers] = useState([]);

	const [refreshUserList] = useRecoilState(deletionModalAtom);

	useEffect(() => {
		getAllUsers()
			.then((users) => {
				setGettingUsers(false);
				setUsers(users);
			})
			.catch(() => {
				setGettingUsers(false);
				setError(true);
			});
	}, [refreshUserList]);

	return (
		<UserTableWrapper data-testid='user-table'>
			<Choose>
				<When condition={!gettingUsers && error}>
					<Error data-testid='fetch-user-error'>
						Failed to fetch users. Please try again later.
					</Error>
				</When>
				<When condition={!gettingUsers && users.length === 0}>
					<NoUsers data-testid='no-users-error'>
						<NoUsersIcon />
						<NoUserLabel>
							{`No users found. Click on "ADD USER" to create a new user`}
						</NoUserLabel>
					</NoUsers>
				</When>
				<When condition={!gettingUsers && !error}>
					<TableHeader />
					<For each='user' of={users}>
						<UserRow
							key={user.userId}
							name={user.name}
							userName={user.userName}
							userId={user.userId}
							role={user.userRole}
							activationStatus={user.isUserActive}
							createdOn={user.userCreatedAt}
						/>
					</For>
				</When>
			</Choose>
		</UserTableWrapper>
	);
}
