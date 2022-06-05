import tw from 'tailwind-styled-components';

export const IconButtonWithLabelContainer = tw.button`
  flex
  items-center
  justify-center
  gap-1
  px-9
  py-2
  shadow-md
  rounded-sm
  text-center
  text-base
  font-semibold
  outline-none
  cursor-pointer
  hover:brightness-110
  transition
  duration-100
  ${(props) => props.$color}
  ${(props) => (props.$width ? props.$width : 'w-fit')}
	${(props) => props.$background}
`;
