import tw from 'tailwind-styled-components';
import { IconButtonWithLabel } from 'styles/Button';

export const UserManagementHeader = tw.div`
    flex
    justify-between
    items-center
    align-middle
    px-4
    py-4
    my-10
    border-b-2
    border-gray-100
    w-11/12
    mx-auto
`;

export const AddButton = tw(IconButtonWithLabel)``;
