import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import {
	PermissionErrorPageWrapper,
	ErrorLabel,
	IconWrapper,
} from './PermissionErrorPage.style.js';

export default function PermissionErrorPage() {
	return (
		<PermissionErrorPageWrapper data-testid='permission-error-page'>
			<IconWrapper>
				<FaUserLock />
			</IconWrapper>
			<ErrorLabel data-testid='permission-error-label'>
				User not permitted to perform the action
			</ErrorLabel>
		</PermissionErrorPageWrapper>
	);
}
