import tw from 'tailwind-styled-components';
import { CustomButton } from 'styles/Button';

export const ToolbarContainer = tw.div`
    w-11/12
    flex
    flex-row
    mx-auto
    mt-6
    mb-4
    justify-center
    align-middle
    px-2
    md:items-center
`;

export const ToolbarInnerContainer = tw.div`
    w-5/6
    flex
    xl:flex-row
    md:flex-col
    mx-auto
    justify-end
    align-middle
    px-2
`;

export const AddMockButton = tw(CustomButton)``;

export const addMocksButtonAdditionalStyles = `
    h-10 
    xl:ml-8 
    xl:mr-2 
    xl:my-2 
    px-1 
    py-1 
    rounded-sm 
    text-sm
    focus:outline-none 
    focus:ring-0 
    transition 
    duration-150 
    ease-in-out
    xl:w-1/6
    md:w-5/6
    md:my-2
    md:mx-auto
`;

export const MoreToolsMockButton = tw(CustomButton)``;

export const moreToolsMockButtonAdditonalStyles = `
    h-10 
    mx-4 
    my-2 
    rounded-sm 
    text-sm 
    border-2 
    border-gray-400 
    hover:bg-black 
    hover:bg-opacity-5 
    focus:outline-none 
    focus:ring-0 
    transition 
    duration-150 
    ease-in-out
    md:my-2
`;

export const ViewMocksWrapper = tw.div`
    flex
    flex-row
    items-center
    justify-center
    md:my-2
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
