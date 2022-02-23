import tw from 'tailwind-styled-components';

export const IconButtonWithoutLabelContainer = tw.button`
  flex
  items-center
  gap-3
  p-4
  m-auto
  shadow-md
  rounded-full
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
