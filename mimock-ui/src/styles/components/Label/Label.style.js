import tw from 'tailwind-styled-components';

export const LabelContainer = tw.div`
    font-sans
    text-gray-500
    mt-3
    ${(props) => props.$font}
    ${(props) => props.$color}
	${(props) => props.$background}
    ${(props) => props.$margin}
`;
