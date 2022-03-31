import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { CustomButton } from 'styles/Button';

export const LoginFormContainer = tw.div`
    w-11/12
    h-full
    flex
    flex-col
    mx-auto
    my-auto
    justify-center
    align-middle
`;

export const Title = tw.div`
    font-sans
    text-xl
    font-bold
    text-gray-700
`;

export const Underline = tw.div`
    bg-teal-500
    w-36
    h-1.5
`;

export const Label = tw.div`
    font-sans
    text-gray-500
    mt-3
`;

export const InputWrapper = tw.form`
    w-11/12
    my-5
    mx-auto
    flex
    flex-col
    justify-center
`;

export const UserNameField = tw.input`
    w-full
    my-2
    p-2
    outline-none
    rounded-md
    border-2
    border-gray-300
`;

export const PasswordField = styled(UserNameField)``;

export const SubmitButton = tw(CustomButton)``;

export const ErrorLabel = tw.div`
    font-sans
    rounded-md
    my-2
    mx-auto
    text-center
    p-3
    shadow-sm
    bg-red-100
    text-red-700
`;
