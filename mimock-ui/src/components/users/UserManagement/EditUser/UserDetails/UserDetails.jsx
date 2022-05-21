import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { getUserInfo } from 'services/users/getUserInfo.service';
import {
	UserDetailsWrapper,
	Label,
	Info,
	Value,
	UserDetailsFetchError,
} from './UserDetails.style';
import UserRole from './UserRole';
import UserActivationStatus from './UserActivationStatus';
import UserPasswordUpdate from './UserPasswordUpdate';

export default function UserDetails() {
	const [searchParams] = useSearchParams();
	const [userFetchError, setUserFetchError] = useState(false);
	const [userInfo, setUserInfo] = useState({
		userName: '',
		name: '',
		userRole: '',
		isUserActive: false,
		userCreatedAt: null,
		passwordUpdatedAt: null,
	});

	useEffect(() => {
		const userId = searchParams.get('userId');

		getUserInfo(userId)
			.then((user) => {
				setUserInfo({
					userName: user.userName,
					name: user.name,
					userRole: user.userRole,
					isUserActive: user.isUserActive,
					userCreatedAt: user.userCreatedAt,
					passwordUpdatedAt: user.passwordUpdatedAt,
				});
			})
			.catch(() => {
				setUserFetchError(true);
			});
	}, []);

	const info = (label, value, key) => {
		return (
			<Info key={key} data-testid={key}>
				<Label>{label}</Label>
				<Value>{value}</Value>
			</Info>
		);
	};

	return (
		<Choose>
			<When condition={userFetchError}>
				<UserDetailsFetchError data-testid='edit-user-details-error'>
					Failed to fetch user details. Please try again later.
				</UserDetailsFetchError>
			</When>
			<Otherwise>
				<UserDetailsWrapper data-testid='edit-user-details'>
					{info('Name', userInfo.name, 'edit-user-name')}
					{info('User Name', userInfo.userName, 'edit-user-username')}
					<UserRole
						userName={userInfo.userName}
						currentUserRole={userInfo.userRole}
					/>
					<UserActivationStatus isUserActive={userInfo.isUserActive} />
					{info(
						'Created on',
						format(
							parseISO(userInfo.userCreatedAt || '1970-01-01 00:01:02'),
							'dd MMM yyyy'
						),
						'edit-user-created-at'
					)}
					<UserPasswordUpdate passwordUpdatedOn={userInfo.passwordUpdatedAt} />
				</UserDetailsWrapper>
			</Otherwise>
		</Choose>
	);
}
