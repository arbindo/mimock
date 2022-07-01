import React from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import { BsQuestionCircle } from 'react-icons/bs';
import { ValidatedInput } from 'styles';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import HttpMethod from './HttpMethod';
import { addMockFormInputData } from './formInputData';
import {
	AddMockFormWrapper,
	FormItem,
	FormLabel,
	HtmlTooltip,
} from './AddMockForm.style';

export default function AddMockForm() {
	const [mockData] = useRecoilState(newMockFieldsAtom);

	const {
		register,
		formState: { errors },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

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
		</AddMockFormWrapper>
	);
}
