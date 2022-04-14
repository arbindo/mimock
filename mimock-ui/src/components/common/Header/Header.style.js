import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from 'assets/logo.svg';

export const HeaderContainer = tw.div`
    w-full
    h-20
    bg-white
    flex
    items-center
    px-4
    py-2
    shadow-md
    justify-space-evenly
    mx-auto
`;

const _TWLogoWrapper = tw.div`
    mx-2
    my-10
    bg-no-repeat
    bg-center
    bg-contain
`;

export const HeaderLogo = styled(_TWLogoWrapper)`
	background-image: url(${Logo});
	width: 40px;
	height: 40px;
`;

export const RightFlexContainer = tw.div`
    flex
    flex-row
    items-center
    justify-between
    w-full
`;

export const MenuItems = tw.div`
    mx-10
    flex
    items-center
    text-gray-600
    gap-10
`;

export const _MenuLink = styled(NavLink)``;

export const MenuLink = tw(_MenuLink)`
    hover:text-gray-900
    hover:border-b-2
`;

export const Options = tw.div`
    flex
    flex-row
    gap-8
    items-center
    justify-center
    text-2xl
    text-gray-500
`;

export const OptionLink = tw(MenuLink)``;
