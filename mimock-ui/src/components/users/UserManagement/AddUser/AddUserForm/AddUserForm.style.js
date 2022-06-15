import tw from 'tailwind-styled-components';
import { Button } from 'styles';

export const FormContainer = tw.form`
	w-11/12
	pl-32
`;

export const InputContainer = tw.div`
	flex
	items-center
	align-middle
	my-8
`;

export const Label = tw.label`
	w-1/5
	font-sans
	font-bold
	subpixel-antialiased	
	text-lg
	text-gray-600
`;

export const ButtonContainer = tw.div`
  flex
  w-1/2
  my-20
  flex-row
  gap-4
`;

export const SubmitButton = tw(Button)``;

export const ResetButton = tw(Button)``;

export const Error = tw.div`
    p-3
    my-10
    text-center
    bg-red-200
    border-2
    border-red-200
    mx-auto
    text-red-600
    font-sans
    w-3/4
    font-semibold
    rounded-lg
    text-lg
`;
