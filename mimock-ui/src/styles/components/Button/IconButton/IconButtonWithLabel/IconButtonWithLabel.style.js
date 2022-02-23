import tw from 'tailwind-styled-components';

export const IconButtonWithLabelContainer = tw.button`
  flex
  items-center
  gap-3
  px-9
  py-3
  m-auto
  shadow-md
  rounded-md
  transition-all
  text-center
  w-fit
  text-lg
  font-semibold
  cursor-pointer
  hover:translate-y-0.5
  hover:brightness-105
	${(props) => Object.values(props.variant)}
`;
