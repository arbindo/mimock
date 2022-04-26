import tw from 'tailwind-styled-components';

export const IconButtonWithLabelContainer = tw.button`
  flex
  items-center
  justify-center
  gap-3
  px-9
  py-3
  shadow-md
  rounded-md
  text-center
  text-lg
  font-semibold
  cursor-pointer
  hover:brightness-105
  ${(props) => props.$color}
  ${(props) => (props.$width ? props.$width : 'w-fit')}
	${(props) => props.$background}
`;
