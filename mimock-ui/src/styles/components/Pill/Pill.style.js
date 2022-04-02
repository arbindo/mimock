import tw from 'tailwind-styled-components';

export const PillWrapper = tw.div`
	px-6
	py-3
	m-auto
	shadow-md
	rounded-full
	text-base
	text-center
	w-fit
	border-2
	font-bold
	cursor-pointer
	${(props) => props.$color}
	${(props) => props.$background}
	${(props) => props.$border}
`;
