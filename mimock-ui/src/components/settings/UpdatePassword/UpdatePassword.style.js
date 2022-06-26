import tw from 'tailwind-styled-components';
import { FaRegEdit } from 'react-icons/fa';

export const UpdatePasswordWrapper = tw.div`
    flex
    items-center
    align-middle
    my-8
`;

export const UpdatePasswordLabel = tw.div`
    w-1/5
    font-sans
    font-bold
    subpixel-antialiased
    text-lg
    text-gray-600
    mx-20
`;

export const PasswordUpdatedDate = tw.div`
    font-sans
    subpixel-antialiased
    text-lg
    text-gray-500
    mr-10
`;

export const EditPasswordIcon = tw(FaRegEdit)`
    text-slate-600
`;
