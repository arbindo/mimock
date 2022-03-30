import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import LoginBackground from 'assets/login-bg-image.jpg';

const _TWLoginWrapper = tw.div`
    flex
    w-full
    h-full
    mx-auto
    my-auto
    items-center
    align-middle
`;

export const LoginWrapper = styled(_TWLoginWrapper)`
	background: url(${LoginBackground}) no-repeat;
	background-size: cover;
`;

export const InnerFlex = tw.div`
    flex
    flex-row
    w-2/4
    xl:w-2/4
    lg:w-2/3
    md:w-11/12
    sm:w-11/12
    rounded-md
    shadow-md
    border-2
    border-gray-50
    bg-white
    mx-auto
    my-auto
`;

export const FormContainer = tw.div`
    w-1/2
    bg-teal-50
    p-6
`;
