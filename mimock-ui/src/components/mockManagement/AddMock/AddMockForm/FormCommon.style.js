import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { Button } from 'styles';

export const FormWrapper = tw.form`
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

export const NoItem = tw.div`
    flex
    items-center
    align-middle
    mx-auto
    justify-center
`;

export const NoItemLabel = tw.div`
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

export const TextWrapper = tw.div`
    my-4
    w-full
`;

export const ParsedTextInput = tw.input`
    bg-gray-50
    outline-blue-200
    border-blue-200
    border-2
    p-2
    text-gray-800
    font-sans
    rounded-md
    w-full
    mx-auto
`;

export const ParsedTextArea = tw.textarea`
    bg-gray-50
    outline-blue-200
    border-blue-200
    border-2
    p-2
    text-gray-800
    font-sans
    rounded-md
    w-full
    mx-auto
`;

export const SaveButton = tw(Button)`
    my-5
`;

export const SuccessPrompt = tw.div`
    font-sans
    mb-4
    text-green-600
`;

export const FailurePrompt = tw.div`
    font-sans
    mb-4
    text-red-600
`;
