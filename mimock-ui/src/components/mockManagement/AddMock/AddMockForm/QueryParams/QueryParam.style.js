import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { AiFillPlusCircle } from 'react-icons/ai';

export const QueryParamsWrapper = tw.div`
    w-full
`;

export const InputContainer = tw.div`
    flex
    items-center
    align-middle
    my-4
`;

export const AddIcon = tw(AiFillPlusCircle)`
    cursor-pointer
    text-green-600
    font-sans
    text-3xl
`;

export const AddToolTip = styled(Tooltip)`
	margin-top: -8px !important;
`;
