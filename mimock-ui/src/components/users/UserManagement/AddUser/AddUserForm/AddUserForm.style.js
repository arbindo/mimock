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

export const InputBlock = tw.div`
	block
	h-12
	min-h-12
	max-h-12
`;

export const Label = tw.label`
	w-1/5
	font-sans
	font-bold
	subpixel-antialiased	
	text-lg
	text-gray-600
`;

export const FormInput = tw.input`
	block
	px-3
	py-1.5
	text-base
	font-normal
	text-gray-700
	bg-zinc-50
	bg-clip-padding
	border
	border-solid
	rounded
	mx-4
	focus:outline-blue-200
	${(props) => (props.$error ? 'border-2 border-rose-300' : 'border-gray-300')}
`;

export const UserRoleInput = tw.select`
    font-sans
    rounded-md
    shadow-md
    font-semibold
    p-2
    border-2
    border-gray-200
    outline-none
	mx-4
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

export const ErrorMessage = tw.div`
	text-red-500
	text-sm
	font-sans
	subpixel-antialiased
	mt-1
	mb-3
	mx-4
	relative
`;

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
