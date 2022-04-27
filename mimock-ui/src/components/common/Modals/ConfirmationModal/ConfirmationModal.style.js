import tw from 'tailwind-styled-components';

export const ModalWrapper = tw.div`
    w-screen
    h-screen
    flex
    justify-center
    items-center
    bg-slate-500/[0.8]
    align-middle
    fixed
    left-0
    right-0
    top-0
    bottom-0
`;

export const ModalBox = tw.div`
    w-1/2
    rounded-md
    shadow-lg
    bg-white
    p-6
`;

export const ModalMessage = tw.div`
    text-center
    font-sans
    font-semibold
    text-xl
    my-4
    text-gray-700
`;

const _ModalButtons = tw.div`
    w-1/2
    text-center
    font-sans
    font-semibold
    text-lg
    mx-auto
    mt-8
    cursor-pointer
    transition-all
    duration-100
    hover:scale-95
`;

export const CancelButton = tw(_ModalButtons)`
    text-gray-500
    hover:text-gray-900
`;

export const ConfirmButton = tw(_ModalButtons)`
    bg-teal-500
    text-white
    rounded-full
    shadow-md
    p-4
    mb-4
    hover:bg-teal-600
`;
