import tw from 'tailwind-styled-components';

const roleBackground = {
	ADMIN: 'bg-teal-400',
	MANAGER: 'bg-indigo-400',
	VIEWER: 'bg-slate-500',
};

export const Pill = tw.div`
    font-sans
    font-semibold
    text-white
    text-sm
    text-center
    antialiased
    mx-auto
    w-24
    p-1
    px-2
    rounded-sm
    shadow-sm
    select-none
    
    ${(props) => roleBackground[props.role]}
    ${(props) => (props.$margin ? props.$margin : 'mx-auto')}
`;
