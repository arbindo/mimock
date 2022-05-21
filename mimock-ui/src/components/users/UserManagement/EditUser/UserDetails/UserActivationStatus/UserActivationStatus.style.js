import tw from 'tailwind-styled-components';
import { Info, Label, DynamicValue } from '../UserDetails.style';

export const UserActivationStatusWrapper = tw(Info)``;

export const UserActivationStatusLabel = tw(Label)``;

export const UserActivationStatusActions = tw(DynamicValue)``;

export const StatusLabel = tw.div`
    font-sans
    font-semibold
    text-xl
    mx-4
    ${(props) => (props.$isActive ? 'text-slate-800' : 'text-slate-300')}
`;
