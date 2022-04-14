import tw from 'tailwind-styled-components';

export const PermissionErrorPageWrapper = tw.div`
	w-full
    h-full
    flex
	flex-col
    bg-gray-200
    opacity-75
    z-999
    fixed
    top-0
    bottom-0
    left-0
    right-0
	text-8xl
	text-gray-600
	justify-center
	items-center
`;

export const IconWrapper = tw.div`
	w-full
	flex
	justify-center
`;

export const ErrorLabel = tw.span`
	text-center
	text-2xl
	text-gray-600
	w-full
`;
