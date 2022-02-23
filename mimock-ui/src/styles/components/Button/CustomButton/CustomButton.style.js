import tw from 'tailwind-styled-components';

export const CustomButtonContainer = tw.button`
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
  hover:brightness-110
  bg-white
  text-black
  ${(props) => props.color}
  ${(props) => props.bgcolor}
`;
