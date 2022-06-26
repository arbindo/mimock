import React from 'react';
import { PropTypes } from 'prop-types';
import RolePill from 'users/UsersTable/UserRow/RolePill';
import { constants } from './constants';
import {
	UserRoleContainer,
	RoleContent,
	UserRoleHeader,
	InfoMessageContainer,
	Message,
	InfoIcon,
} from './UserRole.style';

function UserRole({ role }) {
	// #region Defaults
	const { label, testIds } = constants;
	// #endregion

	return (
		<UserRoleContainer data-testid={testIds.userRoleContainer}>
			<UserRoleHeader data-testid={testIds.userRoleHeader}>
				{label.roleHeader}
			</UserRoleHeader>
			<RoleContent>
				<RolePill role={role} margin='mx-0' />
				<If condition={role !== 'ADMIN'}>
					<InfoMessageContainer
						data-testid={testIds.roleInfoMessage}
						role={role}
					>
						<InfoIcon />
						<Message>{label.roleMessage}</Message>
					</InfoMessageContainer>
				</If>
			</RoleContent>
		</UserRoleContainer>
	);
}

UserRole.propTypes = {
	role: PropTypes.string.isRequired,
};

export default UserRole;
