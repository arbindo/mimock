import tw from 'tailwind-styled-components';

export const PillWrapper = tw.div`
	px-6
	py-3
	m-auto
	shadow-md
	rounded-full
	text-sm
	text-center
	w-fit
	border-2
	cursor-pointer
	${(props) => Object.values(props.variantprops)}
`;
