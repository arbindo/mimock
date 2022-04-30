import tw from 'tailwind-styled-components';
import { IconButtonWithLabel } from 'styles/Button';

export const UserManagementHeader = tw.div`
    flex
    justify-between
    items-center
    align-middle
    px-4
    my-10
    border-b-2
    border-gray-100
    w-11/12
    mx-auto
`;

export const Title = tw.h1`
    font-sans
    text-3xl
    font-semibold
    text-slate-600
    py-6
    w-3/4
`;

export const AddButton = tw(IconButtonWithLabel)``;
