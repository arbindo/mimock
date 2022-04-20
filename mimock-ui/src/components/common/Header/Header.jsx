import React from 'react';
import { routes } from 'constants/routes';
import { FaPowerOff, FaCog } from 'react-icons/fa';
import { getUserDetails } from 'utils/jwtUtils';
import {
	HeaderContainer,
	HeaderLogo as Logo,
	RightFlexContainer,
	MenuItems,
	MenuLink,
	Options,
	OptionLink,
} from './Header.style';

export default function Header() {
	const menuItems = [
		{
			label: 'MOCKS',
			path: routes.mocks.path,
			shouldDisplay: true,
		},
		{
			label: 'USERS',
			path: routes.adminRoutes.users.path,
			shouldDisplay: (() => {
				try {
					const userDetails = getUserDetails();
					return userDetails && userDetails.userRole === 'ROLE_ADMIN';
				} catch (e) {
					return false;
				}
			})(),
		},
	];

	const options = [
		{
			key: 'settings',
			path: routes.settings.path,
			icon: <FaCog />,
		},
		{
			key: 'logout',
			path: routes.logout.path,
			icon: <FaPowerOff />,
		},
	];

	return (
		<HeaderContainer data-testid='header'>
			<MenuLink data-testid='header-logo' to={routes.mocks.path}>
				<Logo />
			</MenuLink>
			<RightFlexContainer>
				<MenuItems data-testid='header-menu-items'>
					<For each='item' of={menuItems}>
						<If condition={item.shouldDisplay}>
							<MenuLink
								data-testid={`menu-item-${item.label.toLowerCase()}`}
								key={item.label}
								to={item.path}
							>
								{item.label}
							</MenuLink>
						</If>
					</For>
				</MenuItems>
				<Options data-testid='header-menu-options'>
					<For each='option' of={options}>
						<OptionLink
							data-testid={`menu-option-${option.key}`}
							key={option.key}
							to={option.path}
						>
							{option.icon}
						</OptionLink>
					</For>
				</Options>
			</RightFlexContainer>
		</HeaderContainer>
	);
}
