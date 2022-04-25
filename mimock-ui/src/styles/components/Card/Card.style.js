import tw from 'tailwind-styled-components';

export const CardContainer = tw.div`
    w-fit
    rounded-md
    p-8
    shadow-lg
    m-10
    ${(props) => props.$color}
	${(props) => props.$background}
	${(props) => props.$width}
	${(props) => props.$padding}
    ${(props) => props.$margin}
	${(props) => props.$border}
`;
