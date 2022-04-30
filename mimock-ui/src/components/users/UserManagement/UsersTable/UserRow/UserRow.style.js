import tw from 'tailwind-styled-components';

export const UserRowContainer = tw.div`
    w-11/12
    flex
    flex-row
    justify-between
    items-center
    align-middle
    p-4
    bg-white
    border
    border-gray-200
    rounded-md
    mx-auto
    my-1
`;

export const User = tw.div`
    font-sans
    font-bold
    text-center
    text-lg
    antialiased 
    text-gray-600
    w-1/4
`;

export const Text = tw.div`
    font-sans
    text-gray-800
    text-center
    w-1/4
`;

export const Timestamp = tw.div`
    w-1/4
    font-sans
    antialiased
    text-center
    text-gray-600
    text-xs
    font-semibold
    text-gray-600
`;

export const RolePill = tw.div`
    w-1/4
`;

export const ActivationStatusWrapper = tw.div`
    w-1/4
    flex
    flex-row
    justify-between
    items-center
    align-middle
    gap-2
`;
