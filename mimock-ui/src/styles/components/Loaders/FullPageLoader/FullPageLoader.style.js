import tw from 'tailwind-styled-components';
import { css } from '@emotion/react';

export const LoaderStyle = css`
	display: block;
	margin: 0 auto;
`;

export const LoaderWrapper = tw.div`
    w-screen
    h-screen
    flex
    justify-center
    items-center
    bg-gray-200
    opacity-75
    z-999
    fixed
    top-0
    bottom-0
    left-0
    right-0
`;
