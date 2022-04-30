import tw from 'tailwind-styled-components';

export const TableHeaderWrapper = tw.div`
    w-11/12
    flex
    flex-row
    justify-between
    p-4
    bg-gray-100
    border
    border-gray-300
    rounded-md
    shadow-sm
    mx-auto
    items-center
    align-middle
    my-1
`;

export const HeaderItem = tw.div`
    font-sans
    font-bold
    text-center
    antialiased 
    text-gray-600
    w-1/4
`;
