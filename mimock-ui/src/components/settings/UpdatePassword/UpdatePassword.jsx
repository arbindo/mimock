import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { getUserInfo } from 'services/users';
import { useRecoilState } from 'recoil';
import editUserDetailsAtom from 'atoms/editUserDetailsAtom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
	UpdatePasswordWrapper,
	UpdatePasswordLabel,
	PasswordUpdatedDate,
	EditPasswordIcon,
} from './UpdatePassword.style';

function UpdatePassword({ userName, userRole }) {
	const [passwordUpdatedOn, setPasswordUpdatedOn] = useState('');
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);
	const ADMIN_ROLE = 'ADMIN';

	useEffect(() => {
		if (userName && userRole === ADMIN_ROLE) {
			getUserInfo({ userName }).then((user) => {
				setPasswordUpdatedOn(user.passwordUpdatedAt);
			});
		}
	}, [userName, userRole]);

	return (
		<UpdatePasswordWrapper data-testid='update-password-container'>
			<UpdatePasswordLabel data-testid='update-password-label'>
				{userRole === ADMIN_ROLE ? 'Password updated on' : 'Update Password'}
			</UpdatePasswordLabel>
			<If condition={passwordUpdatedOn}>
				<PasswordUpdatedDate data-testid='password-updated-date'>
					{format(parseISO(passwordUpdatedOn), 'dd MMM yyyy')}
				</PasswordUpdatedDate>
			</If>
			<Tooltip title='Update password'>
				<IconButton
					data-testid='update-password-btn'
					onClick={() => {
						setUserInfo({
							...userInfo,
							showPasswordUpdateModal: true,
						});
					}}
				>
					<EditPasswordIcon />
				</IconButton>
			</Tooltip>
		</UpdatePasswordWrapper>
	);
}

UpdatePassword.propTypes = {
	userName: PropTypes.string.isRequired,
	userRole: PropTypes.string.isRequired,
};

export default UpdatePassword;
