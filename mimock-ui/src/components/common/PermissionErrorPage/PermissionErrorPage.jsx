import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import { IconButtonWithLabel, IconButtonVariants } from 'styles/Button';
import { routes } from 'constants/routes';
import {
	PermissionErrorPageWrapper,
	ErrorLabel,
	IconWrapper,
	HomeLink,
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
			<HomeLink
				data-testid='permission-error-home-link'
				to={routes.mocks.path}
				replace={true}
			>
				<IconButtonWithLabel
					label='Go back to Dashboard'
					variant={IconButtonVariants.HomeButton}
				/>
			</HomeLink>
		</PermissionErrorPageWrapper>
	);
}
