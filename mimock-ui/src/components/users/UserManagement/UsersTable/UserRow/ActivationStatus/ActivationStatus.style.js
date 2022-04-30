import tw from 'tailwind-styled-components';

export const ActivationStatusWrapper = tw.div`
    flex
    flex-row
    justify-between
    items-center
    align-middle
    gap-2
    mx-auto
`;

export const Indicator = tw.div`
    w-1
`;

export const Blob = tw.div`
    rounded-full
    mx-auto
    block
    p-2
    text-center
`;

export const GreenBlob = tw(Blob)`
    bg-green-500
`;

export const RedBlob = tw(Blob)`
    bg-red-500
`;

export const StatusLabel = tw.div`
    w-24
    font-sans
    font-semibold
    text-center
    text-gray-700
`;
