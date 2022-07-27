import tw from 'tailwind-styled-components';
import { css } from '@emotion/react';
import { Button } from 'styles';

export const PasswordModalWrapper = tw.div`
  2xl:w-1/2
  xl:w-2/4
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
  text-2xl
  text-center
  text-gray-600
  mt-2
  mb-10
`;

export const PasswordContainer = tw.div`
  flex
  2xl:w-1/2
  xl:w-3/4
  md:w-2/4
  sm:w-3/4
  mx-auto
  my-8
  items-center
  align-middle
  justify-between
`;

export const Label = tw.label`
  font-sans
  subpixel-antialiased
  text-gray-700
  font-bold
`;

export const ButtonContainer = tw.div`
  flex
  mx-auto
  justify-evenly
  my-10
  2xl:w-1/2
  xl:w-3/4
  md:w-2/4
  sm:w-3/4
  gap-6
  flex-row-reverse
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

export const PasswordUpdateForm = tw.form`
  w-full
`;

export const CancelButton = tw(Button)``;

export const UpdateButton = tw(Button)``;
