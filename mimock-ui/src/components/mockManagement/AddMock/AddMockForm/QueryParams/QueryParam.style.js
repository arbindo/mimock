import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

export const QueryParamsWrapper = tw.form`
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

export const DeleteIcon = tw(AiFillMinusCircle)`
    cursor-pointer
    text-red-600
    font-sans
    text-3xl
`;

export const ActionToolTip = styled(Tooltip)`
	margin-top: -8px !important;
`;

export const NoQueryParam = tw.div`
    flex
    items-center
    align-middle
    mx-auto
    justify-center
`;

export const NoQueryParamLabel = tw.div`
    font-sans
    font-light
    text-lg
    text-gray-600
    mx-4
    -mt-2
`;

export const AddNewIcon = tw(AddIcon)`
    text-4xl
    text-green-500
`;

export const QueryParamTextWrapper = tw.div`
    my-4
    w-full
`;

export const QueryParamText = tw.textarea`
    bg-gray-200
    outline-blue-200
    border-blue-200
    border-2
    text-gray-800
    font-sans
    rounded-md
    w-full
    mx-auto
`;
