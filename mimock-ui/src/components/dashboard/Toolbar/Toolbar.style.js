import tw from 'tailwind-styled-components';
import { CustomButton } from 'styles/Button';

export const ToolbarContainer = tw.div`
    w-11/12
    flex
    flex-row
    mx-auto
    mt-4
    mb-4
    justify-center
    align-middle
    px-2
`;

export const ToolbarInnerContainer = tw.div`
    w-5/6
    flex
    flex-row
    mx-auto
    justify-end
    align-middle
    px-2
`;

export const AddMockButton = tw(CustomButton)``;

export const MoreToolsMockButton = tw(CustomButton)``;
