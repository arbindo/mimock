import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {
	UserPasswordUpdateWrapper,
	UserPasswordUpdateLabel,
	UserPasswordUpdateActions,
	PasswordUpdatedDate,
	EditPasswordIcon,
} from './UserPasswordUpdate.style';

function UserPasswordUpdate({ passwordUpdatedOn }) {
	return (
		<UserPasswordUpdateWrapper data-testid='edit-user-update-password'>
			<UserPasswordUpdateLabel>Password updated on</UserPasswordUpdateLabel>
			<UserPasswordUpdateActions>
				<If condition={passwordUpdatedOn}>
					<PasswordUpdatedDate data-testid='password-updated-date'>
						{format(parseISO(passwordUpdatedOn), 'dd MMM yyyy')}
					</PasswordUpdatedDate>
				</If>
				<Tooltip title='Update password'>
					<IconButton data-testid='update-password-btn'>
						<EditPasswordIcon />
					</IconButton>
				</Tooltip>
			</UserPasswordUpdateActions>
		</UserPasswordUpdateWrapper>
	);
}

UserPasswordUpdate.propTypes = {
	passwordUpdatedOn: PropTypes.string,
};

export default UserPasswordUpdate;
