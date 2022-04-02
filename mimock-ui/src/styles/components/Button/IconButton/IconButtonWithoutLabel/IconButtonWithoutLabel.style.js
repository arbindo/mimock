import tw from 'tailwind-styled-components';

export const IconButtonWithoutLabelContainer = tw.button`
  flex
  items-center
  gap-3
  p-4
  m-auto
  shadow-md
  rounded-full
  text-center
  w-fit
  text-lg
  font-semibold
  cursor-pointer
  hover:brightness-105
  ${(props) => props.$color}
	${(props) => props.$background}
`;
