import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ActivationSwitch from '@material-ui/core/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
import {
	UserActivationStatusWrapper,
	UserActivationStatusLabel,
	UserActivationStatusActions,
	StatusLabel,
} from './UserActivationStatus.style';

function UserActivationStatus({ isUserActive }) {
	const iosStyles = useIosSwitchStyles();
	const [activationStatus, setActivationStatus] = useState(isUserActive);

	useEffect(() => {
		setActivationStatus(isUserActive);
	}, [isUserActive]);

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
						setActivationStatus(e.target.checked);
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

UserActivationStatus.propTypes = {
	isUserActive: PropTypes.bool.isRequired,
};

export default UserActivationStatus;
