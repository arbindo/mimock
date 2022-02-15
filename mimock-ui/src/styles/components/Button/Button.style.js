import tw from "tailwind-styled-components";

export const ButtonContainer = tw.button`
  text-grey-200
  bg-blue-200
  p-4
  mx-auto
  my-auto
  shadow-md
  rounded-md
  hover:bg-blue-600
  cursor-pointer
  w-1/4
  my-4
  text-lg
  font-semibold
  ${(props) => Object.values(props)}
`;
