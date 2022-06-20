import React from 'react';
import tw from 'tailwind-styled-components';
import { styled } from '@material-ui/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';

export const AddMockFormWrapper = tw.div`
	w-full
	h-full
	mx-10
`;

export const FormItem = tw.div`
	flex
	items-center
	align-middle
	my-8
`;

export const FormLabel = tw.label`
	w-1/5
	font-sans
	font-bold
	subpixel-antialiased	
	text-lg
	text-gray-600
`;

export const AccordionHeader = tw.label`
	w-11/12
	font-sans
	font-bold
	subpixel-antialiased	
	text-lg
	text-gray-600
`;

export const HttpMethodSelect = tw.div`
	mx-4
`;

export const AccordionWrapper = tw(Accordion)`
	w-1/2
	my-8
`;

export const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 350,
		border: '1px solid #dadde9',
	},
}));
