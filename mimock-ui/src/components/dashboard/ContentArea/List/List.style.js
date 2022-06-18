import tw from 'tailwind-styled-components';
import { css } from '@emotion/react';

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
    select-none
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

export const MessageImageIcon = tw.img`
    w-24
    h-24
`;

export const MessageWrapper = tw.div`
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

export const MessageSpan = tw.span`
    text-xl
    text-teal-600
    font-sans
    font-semibold
    ml-4
`;

export const LoaderStyle = css`
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px;
	margin-bottom: 50px;
	width: 1000px;
`;

export const WarningBanner = tw.p`
    text-truncate
    px-2
    py-1
    my-2
    shadow-sm
    rounded-sm
    border-2
    border-amber-400
    bg-amber-200
    select-none
    inline-flex
    items-center
    gap-2
`;

export const FilterTagsSection = tw.div`
    inline-flex
    items-center
    justify-start
    font-sans
    text-sm
    font-light
    my-2
    gap-1
`;

export const FilterTagSpan = tw.span`
    bg-gray-400
    text-white
    px-2
    py-1
    shadow-sm
    rounded-sm
    select-none
`;
