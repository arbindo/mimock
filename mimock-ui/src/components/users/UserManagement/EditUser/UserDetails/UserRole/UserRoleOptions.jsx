import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Select } from 'styles';
import {
	UserRoleActions,
	UpdateRoleButton,
	RoleHint,
} from './UserRole.style.js';

function UserRoleOptions({
	roles,
	margin,
	selectedRole,
	setSelectedRole,
	enableRoleUpdate,
	currentUserRole,
	setShowUpdateConfirmationModal,
	selectedRoleDescription,
	setSelectedRoleDescription,
}) {
	const [roleOptions, setRoleOptions] = useState([]);

	useEffect(() => {
		setRoleOptions(roles.map((role) => role.roleName));
	}, [roles]);

	return (
		<UserRoleActions $margin={margin}>
			<If condition={roleOptions && roleOptions.length}>
				<Select
					options={roleOptions}
					defaultValue={currentUserRole}
					dataTestId='input-role'
					onChange={(e) => {
						setSelectedRole(e.target.value);
						setSelectedRoleDescription(
							roles.find((role) => role.roleName === e.target.value)
								?.roleDescription
						);
					}}
				/>
				<Tooltip
					data-testid='user-role-tooltip'
					key={selectedRole + '-' + selectedRoleDescription}
					title={selectedRoleDescription || 'No description available'}
					arrow
				>
					<IconButton>
						<RoleHint />
					</IconButton>
				</Tooltip>
				<If condition={enableRoleUpdate && currentUserRole !== selectedRole}>
					<UpdateRoleButton
						label='Update role'
						dataTestid='update-role-btn'
						background='bg-green-300'
						color='text-gray-700'
						additionalStyles='mx-4'
						onclickHandler={() => {
							setShowUpdateConfirmationModal(true);
						}}
					/>
				</If>
			</If>
		</UserRoleActions>
	);
}

UserRoleOptions.propTypes = {
	roles: PropTypes.arrayOf(
		PropTypes.shape({
			roleName: PropTypes.string.isRequired,
			roleDescription: PropTypes.string,
		})
	).isRequired,
	margin: PropTypes.string,
	selectedRole: PropTypes.string.isRequired,
	setSelectedRole: PropTypes.func.isRequired,
	enableRoleUpdate: PropTypes.bool.isRequired,
	currentUserRole: PropTypes.string,
	setShowUpdateConfirmationModal: PropTypes.func,
	selectedRoleDescription: PropTypes.string,
	setSelectedRoleDescription: PropTypes.func.isRequired,
};

export default UserRoleOptions;
