import tw from 'tailwind-styled-components';

export const TitlebarContainer = tw.div`
    w-11/12
    flex
    flex-row
    mx-auto
    mt-4
    mb-2
    justify-center
    align-middle
`;

export const Title = tw.div`
    mx-1
    select-none
`;

export const TitleSpan = tw.span`
    inline-flex
    items-center
    justify-center
    font-sans
    text-2xl
    font-bold
    text-gray-700
    mx-auto
    my-auto
`;

export const TitlebarInnerContainer = tw.div`
    w-5/6
    flex
    flex-row
    mx-auto
    justify-end
    align-middle
    px-2
`;

export const SearchField = tw.input`
    w-full
    my-2
    mx-4
    p-2
    outline-none
    rounded-md
    border-2
    border-gray-300
    bg-white
    placeholder:italic 
    placeholder:text-slate-400
    sm:text-sm
`;
