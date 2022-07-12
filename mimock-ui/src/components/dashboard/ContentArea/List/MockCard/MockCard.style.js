import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const _CardRouterLink = styled(Link)``;

export const CardContainer = tw(_CardRouterLink)`
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
    cursor-pointer
    hover:bg-gray-100
    hover:translate-x-1
    overflow-hidden
`;

export const CardTopBadge = tw.span`
    ${(props) => (props.$isDeleted ? 'bg-red-400 text-white' : '')}
    ${(props) => (props.$isArchived ? 'bg-amber-400 text-black' : '')}
    text-white
    px-2
    py-1
    my-auto
    shadow-sm
    text-xs
    relative
    -top-10
    -left-4
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
    px-2
    py-1
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
    mx-2
`;
