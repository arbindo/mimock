import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import Logo from 'assets/logo.svg';

export const SocialWrapperContainer = tw.div`
    block
    w-1/2
    h-full
    justify-center
    mx-auto
    rounded-tl-md
    rounded-bl-md
    border-r-2
    bg-white
    dark:bg-slate-600
`;

export const TopWrapper = tw.div`
    block
    w-full
    h-11/12
`;

const _TWLogoWrapper = tw.div`
    flex
    items-center
    justify-center
    mx-auto
    my-10
    bg-no-repeat
    bg-center
    bg-contain
`;

export const LogoWrapper = styled(_TWLogoWrapper)`
	background-image: url(${Logo});
	width: 200px;
	height: 200px;
`;

export const SocialIconsWrapper = tw.div`
    flex
    justify-around
    items-center
    align-middle
    w-1/2
    mx-auto
    my-14
    text-4xl
    text-slate-800
    dark:text-gray-300
    hover:cursor-pointer
`;

export const Title = tw.h1`
    mt-4
    mx-4
    text-left
    font-bold
    text-2xl
    font-sans
    text-gray-700
    dark:text-gray-300
`;

export const Description = tw.h1`
    mx-4
    text-left
    font-light
    font-sans
    text-gray-700
    dark:text-gray-300
`;

export const LicenseFooter = tw.h1`
    text-right
    font-sans
    text-xs
    text-gray-400
    mr-1
    my-2
    h-1/12
`;

export const Link = tw.a``;
