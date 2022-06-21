import tw from 'tailwind-styled-components';

export const SettingsContainer = tw.div`
    flex
    flex-col
    justify-start
    align-middle
    w-full
    px-9
    mt-8
    mb-4
`;

export const PlatformSettingsHeader = tw.div`
    font-sans
    font-bold
    subpixel-antialiased	
    text-2xl
    text-gray-600
    mx-20
    mb-4
`;

export const SwitchComponentWrapper = tw.div`
    flex
    items-center
    align-middle
    my-2
    justify-start
`;

export const SwitchComponentLabel = tw.div`
    font-sans
    font-semibold
    subpixel-antialiased	
    text-xl
    text-gray-600
    mx-20
`;

export const SwitchComponentStatusActions = tw.div`
    flex
    items-center
    align-middle
`;

export const StatusLabel = tw.div`
    font-sans
    font-light
    text-sm
    mx-4
    ${(props) => (props.$isActive ? 'text-slate-800' : 'text-slate-300')}
`;
