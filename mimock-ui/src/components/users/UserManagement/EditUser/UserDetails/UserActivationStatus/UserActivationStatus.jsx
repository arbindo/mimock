import React, { useState, useEffect } from 'react';
import ActivationSwitch from '@material-ui/core/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
import { useRecoilState } from 'recoil';
import editUserDetailsAtom from 'atoms/editUserDetailsAtom';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import { updateUserActivationStatus } from 'services/users';
import {
	UserActivationStatusWrapper,
	UserActivationStatusLabel,
	UserActivationStatusActions,
	StatusLabel,
} from './UserActivationStatus.style';

function UserActivationStatus() {
	const iosStyles = useIosSwitchStyles();
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);
	const [activationStatus, setActivationStatus] = useState(
		userInfo.isUserActive
	);

	useEffect(() => {
		setActivationStatus(userInfo.isUserActive);
	}, [userInfo.isUserActive]);

	const updateActivationStatus = (e) => {
		updateUserActivationStatus(userInfo.userName, e.target.checked)
			.then((res) => {
				const { userName, updatedActivationStatus } = res;
				setActivationStatus(updatedActivationStatus);
				useNotification({
					type: updatedActivationStatus
						? notificationTypes.NOTIFICATION_TYPE_SUCCESS
						: notificationTypes.NOTIFICATION_TYPE_WARNING,
					title: updatedActivationStatus
						? 'User activated'
						: 'User deactivated',
					message: `User - ${userName} has been ${
						updatedActivationStatus ? 'activated' : 'deactivated'
					}`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
				setUserInfo({
					...userInfo,
					isUserActive: updatedActivationStatus,
				});
			})
			.catch(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: `Failed to update activation status`,
					message: 'Please try again',
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const { root, switchBase, checked, thumb, track } = iosStyles;

	return (
		<UserActivationStatusWrapper data-testid='edit-user-activation-status'>
			<UserActivationStatusLabel>Activation status</UserActivationStatusLabel>
			<UserActivationStatusActions>
				<ActivationSwitch
					data-testid='activation-switch'
					classes={{ root, switchBase, checked, thumb, track }}
					checked={activationStatus}
					onChange={(e) => {
						updateActivationStatus(e);
					}}
				/>
				<StatusLabel
					data-testid='activation-status-label'
					$isActive={activationStatus}
				>
					{activationStatus ? 'Active' : 'Inactive'}
				</StatusLabel>
			</UserActivationStatusActions>
		</UserActivationStatusWrapper>
	);
}

export default UserActivationStatus;
