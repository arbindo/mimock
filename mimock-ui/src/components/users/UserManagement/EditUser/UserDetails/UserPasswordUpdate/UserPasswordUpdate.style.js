import tw from 'tailwind-styled-components';
import { FaRegEdit } from 'react-icons/fa';
import { Info, Label, DynamicValue } from '../UserDetails.style';

export const UserPasswordUpdateWrapper = tw(Info)``;

export const UserPasswordUpdateLabel = tw(Label)``;

export const UserPasswordUpdateActions = tw(DynamicValue)``;

export const EditPasswordIcon = tw(FaRegEdit)`
    text-slate-600
`;

export const PasswordUpdatedDate = tw.div`
    font-sans
    subpixel-antialiased
    text-lg
    text-gray-500
    mr-10
`;
