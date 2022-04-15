import tw from 'tailwind-styled-components';
import { IconButtonWithLabel } from 'styles';

export const ToolbarContainer = tw.div`
    w-11/12
    flex
    flex-row
    mx-auto
    mt-4
    mb-2
    justify-center
    align-middle
`;

export const AddMockButton = tw(IconButtonWithLabel)``;

export const FilterMockButton = tw(IconButtonWithLabel)``;
