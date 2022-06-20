import React from 'react';
import { useForm } from 'react-hook-form';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { BsQuestionCircle } from 'react-icons/bs';
import { ValidatedInput, Select } from 'styles';
import { addMockFormInputData, accordionData } from './formInputData';
import {
	AddMockFormWrapper,
	FormItem,
	FormLabel,
	HttpMethodSelect,
	AccordionWrapper,
	AccordionHeader,
	HtmlTooltip,
} from './AddMockForm.style';

export default function AddMockForm() {
	const {
		register,
		handleSubmit,
		watch,
		setFocus,
		reset,
		clearErrors,
		formState: { errors, isSubmitSuccessful },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	return (
		<AddMockFormWrapper>
			<For each='item' of={addMockFormInputData}>
				<FormItem key={item.name}>
					<FormLabel>{item.label}</FormLabel>
					<ValidatedInput
						name={item.name}
						dataTestId={`input-${item.name}`}
						placeHolder={item.placeholder}
						error={errors[item.name] ? true : false}
						errorMessage={errors[item.name] ? errors[item.name].message : ''}
						register={register(item.name, {
							...item.validators,
						})}
					/>
					<If condition={item.hint}>
						<HtmlTooltip
							data-testid='user-role-tooltip'
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
			<FormItem>
				<FormLabel>HTTP Method</FormLabel>
				<HttpMethodSelect>
					<Select
						options={['GET', 'POST']}
						defaultValue={'GET'}
						dataTestId='input-role'
						onChange={() => {}}
					/>
				</HttpMethodSelect>
			</FormItem>
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
