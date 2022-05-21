import tw from 'tailwind-styled-components';
import { CustomButton } from 'styles';
import { Info, Label, DynamicValue } from '../UserDetails.style';

export const UserPasswordUpdateWrapper = tw(Info)``;

export const UserPasswordUpdateLabel = tw(Label)``;

export const UserPasswordUpdateActions = tw(DynamicValue)``;

export const UpdatePasswordButton = tw(CustomButton)``;

export const PasswordUpdatedDate = tw.div`
    font-sans
    subpixel-antialiased
    text-lg
    text-gray-500
`;
