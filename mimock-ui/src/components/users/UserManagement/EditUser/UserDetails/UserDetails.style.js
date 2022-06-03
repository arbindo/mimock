import tw from 'tailwind-styled-components';

export const UserDetailsWrapper = tw.div`
    mx-auto
    my-10
    w-full
`;

export const Info = tw.div`
    flex
    items-center
    align-middle
    my-8
    justify-between
`;

export const Label = tw.div`
    w-1/5
    font-sans
    font-bold
    subpixel-antialiased	
    text-lg
    text-gray-600
    mx-20
`;

export const Value = tw.div`
    w-1/2
    font-sans
    subpixel-antialiased
    text-lg
    text-gray-500
    mx-20
`;

export const ValueInput = tw.input`
    block
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-gray-100
    bg-clip-padding
    border
    border-solid
    border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:outline-none
`;

export const DynamicValue = tw.div`
    w-1/2
    mx-20
    flex
    items-center
    align-middle
`;

export const UserDetailsFetchError = tw.div`
    p-3
    my-10
    text-center
    bg-red-200
    border-2
    border-red-200
    mx-auto
    text-red-600
    font-sans
    w-3/4
    font-semibold
    rounded-lg
    text-lg
`;
