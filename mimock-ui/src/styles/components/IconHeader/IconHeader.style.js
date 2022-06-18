import tw from 'tailwind-styled-components';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

export const IconHeaderWrapper = tw.div`
  flex
  items-center
  align-middle
  font-sans
  text-2xl
  font-bold
  text-gray-700
`;

export const Title = tw.div`
  mx-2
  select-none
`;

export const GoBack = styled(IconButton)`
	margin-left: 10px !important;
	margin-right: 10px !important;
`;
