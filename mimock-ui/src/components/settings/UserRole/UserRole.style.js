import tw from 'tailwind-styled-components';

const roleBackground = {
	ADMIN: 'bg-teal-400',
	MANAGER: 'bg-indigo-400',
	VIEWER: 'bg-slate-500',
};

const displayBasedOnRole = {
	ADMIN: 'hidden',
	MANAGER: '',
	VIEWER: '',
};

const marginBasedOnRole = {
	ADMIN: '',
	MANAGER: 'mt-8',
	VIEWER: 'mt-8',
};

export const UserRoleContainer = tw.div`
    flex
    flex-col
    justify-start
    align-middle
    w-full
    px-9
    mt-4
    mb-8
`;

export const UserRoleWrapper = tw.div`
    inline-flex
    items-center
    align-middle
    my-2
    justify-start
`;

export const UserRoleHeader = tw.div`
    font-sans
    font-bold
    subpixel-antialiased	
    text-2xl
    text-gray-600
    mx-20
`;

export const Pill = tw.div`
    font-sans
    font-semibold
    text-white
    text-sm
    text-center
    antialiased
    mx-20
    w-40
    py-1
    px-2
    rounded-sm
    shadow-sm
    select-none
    ${(props) => marginBasedOnRole[props.role]}
    ${(props) => roleBackground[props.role]}
`;

export const PillWrapper = tw.div`
    flex
    flex-col
    items-center
    align-middle
    justify-center
`;

export const RoleInfoMessage = tw.span`
    inline-flex
    align-middle
    items-center
    gap-1
    mt-1
    text-sm
    font-light
    text-gray-500
    break-words
    ${(props) => displayBasedOnRole[props.role]}
`;
