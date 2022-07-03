import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import { BsQuestionCircle } from 'react-icons/bs';
import { ValidatedInput } from 'styles';
import { useRecoilState } from 'recoil';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import HttpMethod from './HttpMethod';
import { addMockFormInputData, accordionData } from './formInputData';
import {
	AddMockFormWrapper,
	FormItem,
	FormLabel,
	HtmlTooltip,
	AccordionWrapper,
	AccordionHeader,
} from './AddMockForm.style';

export default function AddMockForm() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const {
		register,
		formState: { errors },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	useEffect(() => {
		return () =>
			setMockData({
				name: '',
				description: '',
				route: '',
				httpMethod: 'GET',
				responseContentType: 'application/json',
				queryParams: '',
				shouldDoExactHeaderMatching: false,
				requestHeader: '',
				requestBody: '',
				requestBodyType: '',
				statusCode: 200,
				expectedTextResponse: '',
				responseHeaders: '',
				binaryFile: '',
			});
	}, []);

	return (
		<AddMockFormWrapper data-testid='add-mock-form'>
			<For each='item' of={addMockFormInputData}>
				<FormItem data-testid={`form-item-${item.name}`} key={item.name}>
					<FormLabel>{item.label}</FormLabel>
					<ValidatedInput
						name={item.name}
						dataTestId={`input-${item.name}`}
						placeHolder={item.placeholder}
						error={errors[item.name] ? true : false}
						errorMessage={errors[item.name] ? errors[item.name].message : ''}
						register={register(item.name, {
							...item.validators,
							value: mockData[item.name],
						})}
					/>
					<If condition={item.hint}>
						<HtmlTooltip
							data-testid={`${item.name}-tooltip`}
							title={item.hint}
							arrow
						>
							<IconButton>
								<BsQuestionCircle />
							</IconButton>
						</HtmlTooltip>
					</If>
				</FormItem>
			</For>
			<HttpMethod selectedMethod={mockData.httpMethod} />
			<For each='accordionItem' of={accordionData}>
				<AccordionWrapper key={accordionItem.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<AccordionHeader>{accordionItem.title}</AccordionHeader>
					</AccordionSummary>
					<AccordionDetails>{accordionItem.content}</AccordionDetails>
				</AccordionWrapper>
			</For>
		</AddMockFormWrapper>
	);
}
