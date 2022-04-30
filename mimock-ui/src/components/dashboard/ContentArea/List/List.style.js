import tw from 'tailwind-styled-components';

export const ListContainer = tw.div`
    flex
    flex-col
    justify-start
    align-middle
    w-full
    px-9
    mt-4
    mb-2
`;

export const ListTitle = tw.div`
    mx-1
    select-none
`;

export const ListClearFilter = tw.div`
    inline-flex
    flex-row
    justify-center
    items-center
    cursor-pointer 
    ml-2
    mb-2
    mt-4
    text-xs
    text-light
`;

export const ListClearFilterText = tw.span`
    ml-0.5
    hover:underline
    hover:underline-offset-1
`;

export const ListTitleSpan = tw.span`
    inline-flex
    items-center
    justify-start
    font-sans
    text-2xl
    font-light
    text-gray-500
    my-2
`;

export const EmptyStateImage = tw.img`
    w-12
    h-12
`;

export const ListEmptyStateWrapper = tw.div`
    p-3
    my-4
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
