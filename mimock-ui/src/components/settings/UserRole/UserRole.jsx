import React from 'react';
import { PropTypes } from 'prop-types';
import { constants } from './constants';
import {
	UserRoleContainer,
	UserRoleWrapper,
	PillWrapper,
	UserRoleHeader,
	Pill,
	RoleInfoMessage,
} from './UserRole.style';
import { FaInfoCircle } from 'react-icons/fa';

function UserRole({ role }) {
	// #region Defaults
	const { label, testIds } = constants;
	// #endregion

	return (
		<UserRoleContainer data-testid={testIds.userRoleContainer}>
			<UserRoleWrapper>
				<UserRoleHeader data-testid={testIds.userRoleHeader}>
					{label.roleHeader}
				</UserRoleHeader>
				<PillWrapper>
					<Pill data-testid={`${testIds.rolePill}${role}`} role={role}>
						{role}
					</Pill>
					<RoleInfoMessage data-testid={testIds.roleInfoMessage} role={role}>
						<FaInfoCircle /> {label.roleMessage}
					</RoleInfoMessage>
				</PillWrapper>
			</UserRoleWrapper>
		</UserRoleContainer>
	);
}

UserRole.propTypes = {
	role: PropTypes.string.isRequired,
};

export default UserRole;
