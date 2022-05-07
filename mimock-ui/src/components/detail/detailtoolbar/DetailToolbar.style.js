import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const _BackRouterLink = styled(Link)``;

export const DetailToolbarContainer = tw.div`
    flex
    flex-row
    justify-start
    align-middle
    w-full
    mt-4
    mb-2
`;

export const BackButton = tw(_BackRouterLink)``;

export const MiniBtnSpan = tw.span`
    inline-flex
    items-center
    justify-between
    gap-1
`;
