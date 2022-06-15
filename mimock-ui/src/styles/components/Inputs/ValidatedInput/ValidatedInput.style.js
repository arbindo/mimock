import tw from 'tailwind-styled-components';

export const InputBlock = tw.div`
	block
	h-12
	min-h-12
	max-h-12
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

export const ErrorMessage = tw.div`
	text-red-500
	text-xs
	font-sans
	subpixel-antialiased
	mx-4
	w-40
	absolute
`;
