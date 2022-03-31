import tw from 'tailwind-styled-components';

export const CustomButtonContainer = tw.button`
  px-9
  py-2
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
