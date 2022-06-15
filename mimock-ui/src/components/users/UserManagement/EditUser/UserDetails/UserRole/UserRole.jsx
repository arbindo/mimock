import React, { useState, useEffect } from 'react';
import useNotification from 'hooks/useNotification';
import { getUserRoles, updateUserRole } from 'services/users';
import { ConfirmationModal } from 'components/common/Modals';
import { useRecoilState } from 'recoil';
import editUserDetailsAtom from 'atoms/editUserDetailsAtom';
import { notificationTypes } from 'constants/notificationConstants';
import UserRoleOptions from './UserRoleOptions';
import { UserRoleWrapper, UserRoleLabel } from './UserRole.style.js';

function UserRole() {
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);
	const { userName, userRole: currentUserRole } = userInfo;

	const [roles, setRoles] = useState([]);
	const [selectedRole, setSelectedRole] = useState(currentUserRole);
	const [selectedRoleDescription, setSelectedRoleDescription] = useState('');
	const [roleFetchError, setRoleFetchError] = useState(false);
	const [updatingUserRole, setUpdatingUserRole] = useState(false);
	const [showUpdateConfirmationModal, setShowUpdateConfirmationModal] =
		useState(false);

	const updateConfirmationMessage = `Are you sure you want to update user role to "${selectedRole}" ?`;
	const updatingMessage = 'Updating user role. Please wait...';

	useEffect(() => {
		setSelectedRole(currentUserRole);

		getUserRoles()
			.then((res) => {
				setRoles(res);
				setSelectedRoleDescription(
					res.find((role) => role.roleName === currentUserRole)?.roleDescription
				);
			})
			.catch(() => {
				setRoleFetchError(true);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: `Failed to fetch role for user`,
					message: 'Excluding role modification from edit user form',
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			});
	}, [currentUserRole, useNotification]);

	const updateRole = async () => {
		setUpdatingUserRole(true);
		updateUserRole(userName, selectedRole)
			.then(() => {
				setUpdatingUserRole(false);
				setShowUpdateConfirmationModal(false);
				setUserInfo({
					...userInfo,
					userRole: selectedRole,
				});
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'User role updated successfully',
					message: `User role updated to ${selectedRole}`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			})
			.catch(() => {
				setUpdatingUserRole(false);
				setShowUpdateConfirmationModal(false);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to update user role',
					message: 'Please try again',
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			});
	};

	return (
		<If condition={!roleFetchError}>
			<If condition={showUpdateConfirmationModal}>
				<ConfirmationModal
					message={updateConfirmationMessage}
					confirmButtonLabel='Update user role'
					loading={updatingUserRole}
					loadingMessage={updatingMessage}
					onConfirm={async () => {
						await updateRole();
					}}
					onCancel={() => {
						setShowUpdateConfirmationModal(false);
					}}
				/>
			</If>
			<UserRoleWrapper data-testid='edit-user-role'>
				<UserRoleLabel>Role</UserRoleLabel>
				<UserRoleOptions
					roles={roles}
					selectedRole={selectedRole}
					setSelectedRole={setSelectedRole}
					enableRoleUpdate={true}
					currentUserRole={currentUserRole}
					selectedRoleDescription={selectedRoleDescription}
					setSelectedRoleDescription={setSelectedRoleDescription}
					setShowUpdateConfirmationModal={setShowUpdateConfirmationModal}
				/>
			</UserRoleWrapper>
		</If>
	);
}

export default UserRole;
