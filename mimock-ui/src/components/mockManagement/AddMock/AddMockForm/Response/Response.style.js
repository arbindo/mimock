import tw from 'tailwind-styled-components';

export const ResponseTypeWrapper = tw.div`
    flex
    items-center
    justify-start
    mt-2
    mb-10
    p-2
    align-middle
    w-full
`;

export const TypeLabel = tw.div`
    font-sans
    text-gray-600
    mx-4
    text-justify
    font-semibold
`;

export const ResponseWrapper = tw.form`
    w-full
`;

export const TextResponse = tw.textarea`
    bg-gray-50
    outline-blue-200
    border-blue-200
    border-2
    p-2
    text-gray-800
    font-sans
    rounded-md
    w-full
    mx-auto
`;

export const FileUploadWrapper = tw.div`
    w-full
`;

export const UploadContainer = tw.div`
    text-center
    border-2
    p-6
    border-dashed
    border-2
    rounded-md
    border-gray-400
    font-sans
    font-semibold
    text-gray-400
    shadow-md
    outline-blue-200
    cursor-pointer
    active:bg-blue-50
    hover:bg-blue-50
    active:text-blue-500
`;

export const UploadInput = tw.input`
    w-full
`;

export const UploadedFile = tw.div`
    mx-auto
    w-full
    flex
    items-center
    justify-start
    align-middle
    p-2
    my-2
`;

export const Label = tw.div`
    text-center
    font-sans
    font-semibold
    mx-4
`;

export const File = tw.div`
    font-sans
    text-justify
    text-gray-600
`;
