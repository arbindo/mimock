import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowCircleLeft } from 'react-icons/fa';
import {
	MdArchive,
	MdUnarchive,
	MdDelete,
	MdEdit,
	MdOutlineReportProblem,
} from 'react-icons/md';

export const _BackRouterLink = styled(Link)``;

export const DetailToolbarContainer = tw.div`
    flex
    flex-row
    justify-between
    align-middle
    w-full
    mt-4
    mb-2
`;

export const BackButton = tw(_BackRouterLink)`
    px-2
    py-2 
    mx-1
    hover:bg-gray-100
`;

export const MiniBtnSpan = tw.span`
    inline-flex
    items-center
    justify-between
    gap-2
    text-lg
    text-gray-600
`;

export const BaseButton = tw.div`
    cursor-pointer 
    px-2
    py-2 
    mx-1
    hover:bg-gray-100
`;

export const OperationsContainer = tw.div`
    inline-flex
    items-center
    justify-between
`;

export const WarningMessage = tw.span`
    inline-flex
    align-middle
    items-center
    gap-1
`;

const iconStyle = 'text-2xl text-gray-600';

export const ArchiveIcon = tw(MdArchive)`
    ${() => iconStyle}
`;

export const UnArchiveIcon = tw(MdUnarchive)`
    ${() => iconStyle}
`;

export const DeleteIcon = tw(MdDelete)`
    ${() => iconStyle}
`;

export const EditIcon = tw(MdEdit)`
    ${() => iconStyle}
`;

export const ReportProblemIcon = tw(MdOutlineReportProblem)`
    ${() => iconStyle}
`;

export const BackIcon = tw(FaArrowCircleLeft)`
    text-2xl text-gray-600
`;
