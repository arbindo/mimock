import tw from 'tailwind-styled-components';
import { FaUserSlash } from 'react-icons/fa';

export const UserTableWrapper = tw.div`
  w-full
  my-10
  mx-auto
`;

export const Error = tw.div`
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
    text-lg
`;

export const NoUsers = tw.div`
    bg-white
    shadow-sm
    w-3/4
    my-10
    mx-auto
    rounded-md
    border
    border-gray-300
    text-center
    flex
    items-center
    align-middle
    justify-center
    p-10
    gap-10
`;

export const NoUsersIcon = tw(FaUserSlash)`
    text-teal-500
    text-6xl
`;

export const NoUserLabel = tw.div`
    text-xl
    text-gray-500
`;
