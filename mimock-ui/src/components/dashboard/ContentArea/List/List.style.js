import tw from 'tailwind-styled-components';

export const ListContainer = tw.div`
    flex
    flex-col
    justify-center
    align-middle
    w-full
    px-9
`;

export const EmptyStateImage = tw.img`
    w-12
    h-12
`;

export const ListEmptyStateWrapper = tw.div`
    p-3
    my-10
    text-center
    bg-white
    border-2
    border-gray-200
    mx-auto
    w-full
    rounded-sm
    shadow-sm
    inline-flex
    items-center
    justify-center
    select-none
`;

export const ListEmptyStateMessage = tw.span`
    text-xl
    text-teal-600
    font-sans
    font-semibold
    ml-4
`;
