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

export const ViewMocksWrapper = tw.div`
    flex
    flex-row
    items-center
    justify-center
`;

export const ViewMocksInnerWrapper = tw.div`
    inline-flex
`;

export const GeneralMocksViewButton = tw(CustomButton)``;
export const generalMocksViewButtonAdditionalStyles = `
    h-10 
    rounded-l-sm 
    border-2
    border-gray-400
    rounded-r-none 
    text-sm 
    leading-tight 
    hover:bg-black 
    hover:bg-opacity-5 
    focus:outline-none 
    focus:ring-0 
    transition 
    duration-150 
    ease-in-out`;

export const ArchivedMocksViewButton = tw(CustomButton)``;
export const archivedMocksViewButtonAdditionalStyles = `
    h-10 
    rounded-none 
    text-sm 
    border-t-2 
    border-b-2
    border-gray-400
    hover:bg-black 
    hover:bg-opacity-5
    focus:outline-none 
    focus:ring-0
    transition
    duration-150
    ease-in-out
`;

export const RecycleBinViewButton = tw(CustomButton)``;
export const recycleBinViewButtonAdditionalStyles = `
    h-10 
    rounded-r-sm 
    border-2
    border-gray-400
    rounded-l-none 
    text-sm 
    leading-tight
    hover:bg-black 
    hover:bg-opacity-5
    focus:outline-none 
    focus:ring-0
    transition
    duration-150
    ease-in-out
`;
