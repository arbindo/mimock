import tw from 'tailwind-styled-components';

export const DetailContentViewerContainer = tw.div`
    flex
    flex-col
    justify-start
    align-middle
    w-full
    mt-4
    mb-2
`;

export const NavTabsContainer = tw.ul`
    nav
    nav-tabs
    flex
    flex-col
    md:flex-row
    flex-wrap
    list-none
    pl-0
    mb-4
   
`;

export const NavTab = tw.li`
    nav-item
    flex-auto
    text-center
`;

export const NavTabLink = tw.div`
    inline-flex
    items-center
    justify-center
    align-middle
    gap-2
    nav-link
    w-full
    block
    font-medium
    text-xs
    leading-tight
    border-2 
    border-transparent
    px-6
    py-3
    my-2
    rounded-sm
    hover:bg-black 
    hover:bg-opacity-5 
    hover:text-teal-500
    focus:outline-none 
    focus:ring-0 
    transition 
    duration-150 
    ease-in-out
    cursor-pointer
`;

export const NavTabContent = tw.div`
    tab-content
    font-light
    shadow-sm
    rounded-sm
    mt-2
    mb-4
    px-4
    py-2
    border-2
    border-gray-100
`;
