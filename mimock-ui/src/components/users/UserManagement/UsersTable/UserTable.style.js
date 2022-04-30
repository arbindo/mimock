import tw from 'tailwind-styled-components';

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

export const NoUsers = tw(Error)`
    bg-yellow-200
    text-yellow-600
`;
