import tw from 'tailwind-styled-components';
import { FaInfoCircle } from 'react-icons/fa';

export const UserRoleContainer = tw.div`
    flex
    my-8
`;

export const RoleContent = tw.div`
    block
    w-1/2
    font-sans
    font-bold
    subpixel-antialiased
    text-lg
    text-gray-600
`;

export const UserRoleHeader = tw.div`
    w-1/5
    font-sans
    font-bold
    subpixel-antialiased
    text-lg
    text-gray-600
    mx-20
`;

export const InfoMessageContainer = tw.div`
    flex
    align-middle
    items-center
    gap-1
    mt-2
`;

export const Message = tw.div`
    text-sm
    font-normal
    text-gray-500
    break-words
`;

export const InfoIcon = tw(FaInfoCircle)`
    text-xl
`;
