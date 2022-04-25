import tw from 'tailwind-styled-components';

export const UserListWrapper = tw.div`
    w-full
    h-full
`;

export const Header = tw.h1`
    font-sans
    text-3xl
    font-semibold
    text-slate-600
    my-10
    mx-10
`;

export const List = tw.div`
    w-11/12
    flex
    my-10
    mx-auto
    justify-between
    gap-4
`;

export const UsersError = tw.div`
    p-3
    my-10
    text-center
    bg-red-200
    border-2
    border-red-200
    mx-auto
    text-red-600
    font-sans
    w-3/4
    font-semibold
    rounded-lg
    text-xl
`;

export const User = tw.div`
    w-1/2
    p-10
    my-2
    flex
    justify-between
    shadow-md
    rounded-md
    border-2
    border-gray-100
    gap-4
`;

export const UserInfoFlexOne = tw.div`
    flex
    justify-center
    gap-8
`;

export const UserDetails = tw.div`
    block
`;

export const UserIcon = tw.div`
    text-center
    w-14
    h-14
    flex
    justify-center
    items-center
    align-middle
    rounded-full
    ${(props) => props.$color}
    text-white
    font-sans
    font-bold
    text-2xl
    border-2
    shadow-sm
`;

export const Name = tw.h1`
    font-sans
    text-2xl
    font-semibold
    text-gray-700
`;

export const UserName = tw.h1`
    font-sans
    text-xl
    text-gray-500
`;

export const Options = tw.div`first-letter:
    text-center
    text-2xl
    text-gray-600
    cursor-pointer
    flex
    flex-col
    justify-center
    items-center
    align-middle
    gap-4
`;
