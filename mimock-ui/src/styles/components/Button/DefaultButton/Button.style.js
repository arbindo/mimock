import tw from 'tailwind-styled-components';

export const ButtonContainer = tw.button`
  px-9
  py-3
  m-auto
  shadow-md
  rounded-md
  text-center
  text-base
  font-semibold
  cursor-pointer
  hover:brightness-105
	${(props) => props.$color}
  ${(props) => (props.$width ? props.$width : 'w-fit')}
	${(props) => props.$background}
`;
