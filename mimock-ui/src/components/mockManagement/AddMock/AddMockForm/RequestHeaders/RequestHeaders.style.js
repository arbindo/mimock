import tw from 'tailwind-styled-components';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export const ToggleModeWrapper = tw.div`
    block'
    w-full
`;

export const SwitchWrapper = tw.div`
    flex
    justify-start
    items-center
    mb-5
    aligm-middle
`;

export const SwitchLabel = tw.div`
    font-sans
    text-lg
    text-gray-600
    mx-2
`;

export const HintWrapper = tw.div`
    flex
    items-center
    justify-start
    gap-2
    align-middle
    my-auto
    mx-2
    mt-4
    mb-6
`;

export const HintIcon = tw(AiOutlineExclamationCircle)`
    text-6xl
    text-gray-500
`;

export const Hint = tw.div`
    text-sm
    font-light
    text-gray-500
    mx-2
    text-justify	
`;
