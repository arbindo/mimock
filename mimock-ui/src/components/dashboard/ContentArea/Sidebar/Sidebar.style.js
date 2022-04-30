import tw from 'tailwind-styled-components';

export const SideBarContainer = tw.div`
    w-1/4
    flex
    flex-row
    mx-4
    mt-4
`;

export const SidebarBox = tw.div`
    w-full
    flex
    flex-col
    shadow-sm
    px-4
    py-2
    shadow-sm
    rounded-sm
`;

export const TitleSpan = tw.span`
    inline-flex
    items-center
    justify-center
    mb-4
    text-gray-500
`;

export const SpanText = tw.div`
    font-sans
    text-xl
    text-center
    font-bold
    select-none
    my-1
    mx-1
`;

export const RowComponentWrapper = tw.div`
    flex
    flex-row
    flex-wrap
    justify-start
    align-items
    mx-2
    mt-2
`;

export const ComponentWrapper = tw.div`
    flex
    flex-col
    mx-2
    my-2
`;

export const ComponentLabel = tw.label`
    form-check-label
    inline-block
    text-gray-400
    text-sm
    underline
    underline-offset-1
    mb-1
`;

export const SelectComponent = tw.select`
    w-full
    justify-center
    border-2
    rounded-sm
    border-gray-200
    text-teal-500
    text-sm
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

export const FormCheckWrapper = tw.div`
    form-check
`;

export const RadioComponent = tw.input`
    form-check-input
    appearance-none
    rounded-full
    h-4
    w-4
    border
    border-gray-300
    rounded-sm
    bg-white
    checked:bg-teal-600 
    checked:border-teal-600 
    focus:outline-none 
    transition 
    duration-200 
    mt-1 
    align-top 
    bg-no-repeat 
    bg-center 
    bg-contain 
    float-left 
    mr-2 
    cursor-pointer
`;

export const RadioOptionText = tw.label`
    form-check-label
    inline-block
    text-xs
    text-gray-400
`;

export const BadgeFilter = tw.div`
    text-center
    px-2
    py-1
    rounded-md
    shadow-sm
    select-none
    my-1
    mx-2
    cursor-pointer
`;
