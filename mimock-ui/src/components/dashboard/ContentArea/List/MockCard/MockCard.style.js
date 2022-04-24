import tw from 'tailwind-styled-components';

export const CardContainer = tw.div`
    w-full
    flex
    flex-row
    align-middle
    border-2
    border-gray-100
    shadow-sm
    rounded-sm
    px-8
    py-4
    mx-auto
    my-4
    cursor-pointer
    hover:bg-gray-100
    hover:translate-x-1
`;

export const CardTitleContainer = tw.div`
    w-3/6
    flex
    flex-col
    justify-start
    align-middle
`;

export const CardTitle = tw.p`
    text-2xl
    font-bold
    capitalize
    truncate
    my-2
`;

export const CardSubtitle = tw.p`
    text-base
    font-light
    capitalize
    truncate
    my-1
`;

export const CardMetaContainer = tw.div`
    w-3/6
    flex
    flex-row
    justify-end
    align-middle
`;

export const CardBadge = tw.div`
    text-center
    border-2
    px-4
    py-2
    rounded-md
    shadow-sm
    select-none
    my-2
    mx-auto
`;

export const CardMetaInner = tw.div`
    w-3/6
    flex
    flex-col
    justify-center
    align-middle
`;

export const CardLink = tw.div`
    text-lg
    text-center
    text-black
    font-light
    truncate
    my-1
`;

export const CardLinkSpan = tw.span`
    inline-flex
    items-center
    justify-center
    text-teal-500
`;
