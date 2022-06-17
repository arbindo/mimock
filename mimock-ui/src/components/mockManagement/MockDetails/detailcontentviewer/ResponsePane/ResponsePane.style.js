import tw from 'tailwind-styled-components';

export const NavTabPane = tw.div`
    grid
    grid-cols-1
    gap-6
    fade
    px-4
    py-2
    my-2
`;

export const ContentItem = tw.div`
    mb-3
`;

export const ItemLabel = tw.label`
    form-label
    inline-block
    mb-2
    text-gray-700
`;

export const Item = tw.input`
    form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-gray-100 bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:outline-none
`;

export const ItemPreFormat = tw.pre`
    
`;

export const Code = tw.code`
    language-json
`;
