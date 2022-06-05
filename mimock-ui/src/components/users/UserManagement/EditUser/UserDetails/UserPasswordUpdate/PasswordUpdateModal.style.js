import tw from 'tailwind-styled-components';
import { css } from '@emotion/react';

export const PasswordModalWrapper = tw.div`
  xl:w-3/4
  md:w-11/12
  bg-white
  mx-auto
  my-4
  p-3
  shadow-sm
  border
  border-gray-150
  rounded-md
`;

export const Header = tw.div`
  font-sans
  subpixel-antialiased
  text-base
  text-center
  text-gray-400
  mt-2
  mb-10
`;

export const PasswordContainer = tw.div`
  flex
  xl:w-1/2
  md:w-2/4
  mx-auto
  my-4
  items-center
  align-middle
  justify-between
`;

export const Label = tw.label`
  font-sans
  subpixel-antialiased
  text-gray-700
`;

export const PasswordInput = tw.input`
  rounded-md
  border
  bg-gray-50
  border-gray-200
  outline-none
  p-2
`;

export const ButtonContainer = tw.div`
  flex
  mx-auto
  justify-evenly
  my-10
  w-1/2
  gap-6
`;

export const PasswordError = tw.div`
  font-sans
  font-semibold
  my-3
  text-red-500
  text-center
`;

export const LoaderStyle = css`
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px;
	margin-bottom: 50px;
	height: 20px;
	text-align: center;
	padding: 20px;
	display: block;
`;
