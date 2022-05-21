import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {
	UserPasswordUpdateWrapper,
	UserPasswordUpdateLabel,
	UserPasswordUpdateActions,
	UpdatePasswordButton,
	PasswordUpdatedDate,
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
				<UpdatePasswordButton
					label='Update password'
					dataTestid='update-password-btn'
					background='bg-sky-500'
					color='text-white'
					additionalStyles='mx-10'
					onclickHandler={() => {}}
				/>
			</UserPasswordUpdateActions>
		</UserPasswordUpdateWrapper>
	);
}

UserPasswordUpdate.propTypes = {
	passwordUpdatedOn: PropTypes.string,
};

export default UserPasswordUpdate;
