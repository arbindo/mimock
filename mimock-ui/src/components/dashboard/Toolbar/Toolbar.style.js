import tw from 'tailwind-styled-components';
import { CustomButton } from 'styles/Button';

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

export const FilterMockButton = tw(CustomButton)``;

export const SelectWrapper = tw.div`
    flex
    flex-col
    mx-2
    my-2
    w-1/6
`;

export const SelectLabel = tw.label`
    text-gray-400
    text-xs
`;

export const SelectComponent = tw.select`
    w-full
    justify-center
    border-2
    rounded-sm
    border-gray-200
    text-teal-500
    outline-none
    mx-2
    my-2
`;

export const SelectOptionComponent = tw.option`
    bg-white
    truncate
    rounded-sm
    outline-none
    text-gray-400
`;
