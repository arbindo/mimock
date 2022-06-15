import tw from 'tailwind-styled-components';
import { BsQuestionCircle } from 'react-icons/bs';
import { CustomButton } from 'styles';
import { Info, Label } from '../UserDetails.style';

export const UserRoleWrapper = tw(Info)``;

export const UserRoleLabel = tw(Label)``;

export const UserRoleActions = tw.div`
    w-1/2
    flex
    items-center
    align-middle
    ${(props) => (props.$margin ? props.$margin : 'mx-20')}
`;

export const RoleOptions = tw.select`
    font-sans
    rounded-md
    shadow-md
    font-semibold
    p-2
    border-2
    border-gray-200
    outline-none
    mr-2
`;

export const RoleHint = tw(BsQuestionCircle)`
    text-gray-500
    text-2xl
`;

export const UpdateRoleButton = tw(CustomButton)``;
