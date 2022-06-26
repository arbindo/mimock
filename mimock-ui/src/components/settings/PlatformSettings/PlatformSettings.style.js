import tw from 'tailwind-styled-components';

export const SettingsContainer = tw.div`
    flex
    flex-col
    justify-start
    align-middle
    w-full
    mt-8
    mb-4
`;

export const PlatformSettingsHeader = tw.div`
    font-sans
    font-bold
    subpixel-antialiased	
    text-lg
    text-gray-600
    mx-20
    mb-4
`;

export const PlatformSettingsOptions = tw.div`
    block
    w-11/12
    mx-24
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
    subpixel-antialiased	
    text-gray-600
    mx-10
`;

export const SwitchComponentStatusActions = tw.div`
    flex
    items-center
    align-middle
    mx-10
`;

export const StatusLabel = tw.div`
    font-sans
    font-semibold
    text-sm
    mx-4
    ${(props) => (props.$isActive ? 'text-slate-800' : 'text-slate-300')}
`;
