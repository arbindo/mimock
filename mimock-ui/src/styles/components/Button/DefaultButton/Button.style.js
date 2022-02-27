import tw from 'tailwind-styled-components';

export const ButtonContainer = tw.button`
  px-9
  py-3
  m-auto
  shadow-md
  rounded-md
  transition-all
  text-center
  w-fit
  text-base
  font-semibold
  cursor-pointer
  hover:translate-y-0.5
  hover:brightness-105
	${(props) => props.color}
	${(props) => props.background}
`;
