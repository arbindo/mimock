import tw from 'tailwind-styled-components';

export const CustomButtonContainer = tw.button`
  flex
  items-center
  justify-center
  gap-1
  px-9
  py-3
  mx-auto
  shadow-md
  rounded-md
  text-center
  text-base
  font-semibold
  cursor-pointer
  hover:brightness-110
  ${(props) => props.$additionalStyles}
  ${(props) => props.$color}
  ${(props) => (props.$width ? props.$width : 'w-fit')}
  ${(props) => props.$background}
`;
