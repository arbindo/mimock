import tw from 'tailwind-styled-components';

export const HeaderContainer = tw.div`
    w-full
    flex
    flex-row
    align-middle
    border-2
    border-gray-100
    shadow-sm
    rounded-sm
    px-4
    py-2
    mx-auto
    my-4
`;

export const TitleContainer = tw.div`
    w-3/6
    flex
    flex-col
    justify-start
    align-middle
`;

export const Title = tw.p`
    text-2xl
    capitalize
    truncate
    my-2
`;

export const Subtitle = tw.p`
    text-base
    font-light
    capitalize
    truncate
    mt-1
    mb-2
`;

export const MetaContainer = tw.div`
    w-3/6
    flex
    flex-row
    justify-end
    align-middle
`;

export const Badge = tw.div`
    text-center
    px-2
    py-1
    rounded-md
    shadow-sm
    select-none
    my-2
    mx-auto
`;

export const MetaInner = tw.div`
    w-3/6
    flex
    flex-col
    justify-center
    align-middle
`;

export const Link = tw.div`
    text-base
    text-center
    text-black
    truncate
    font-light
    my-1
`;

export const LinkDiv = tw.div`
    flex
    items-center
    justify-start
    text-teal-500
`;

export const LinkText = tw.span`
    text-black
`;
