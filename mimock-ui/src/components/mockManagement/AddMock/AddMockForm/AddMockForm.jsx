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
import { createMock } from 'services/mockManagement/mockManagement.service';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import HttpMethod from './HttpMethod';
import { addMockFormInputData, accordionData } from './formInputData';
import {
	AddMockFormWrapper,
	FormItem,
	FormLabel,
	HtmlTooltip,
	AccordionWrapper,
	AccordionHeader,
	ButtonWrapper,
	ActionButton,
} from './AddMockForm.style';

export default function AddMockForm() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	const clearMockData = () => {
		clearErrors();
		reset(undefined, {
			keepError: false,
		});
		setMockData({
			name: '',
			description: '',
			route: '',
			httpMethod: 'GET',
			responseContentType: 'application/json',
			responseType: 'TEXTUAL_RESPONSE',
			queryParams: '',
			shouldDoExactHeaderMatching: false,
			requestHeader: '',
			requestBody: '',
			requestBodyType: 'application/json',
			statusCode: 200,
			expectedTextResponse: '',
			responseHeaders: '',
			binaryFile: new File([], ''),
		});
	};

	useEffect(() => {
		return () => clearMockData();
	}, []);

	const createNewMock = (formData) => {
		const { name, description, route, statusCode } = formData;

		const createMockData = new FormData();
		createMockData.append('name', name);
		createMockData.append('description', description);
		createMockData.append('route', route);
		createMockData.append('statusCode', statusCode);
		createMockData.append('httpMethod', mockData.httpMethod);
		createMockData.append('responseContentType', mockData.responseContentType);
		createMockData.append('queryParams', mockData.queryParams);
		createMockData.append(
			'shouldDoExactHeaderMatching',
			mockData.shouldDoExactHeaderMatching
		);
		createMockData.append('requestHeader', mockData.requestHeader);
		createMockData.append('requestBody', mockData.requestBody);
		createMockData.append('requestBodyType', mockData.requestBodyType);
		createMockData.append(
			'expectedTextResponse',
			mockData.expectedTextResponse
		);
		createMockData.append('binaryFile', mockData.binaryFile);
		createMockData.append('responseHeaders', mockData.responseHeaders);

		createMock(createMockData)
			.then(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'New mock created successfully',
					message: `Mock can be accessed at ${route}`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
				clearMockData();
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to create new mock',
					message: err?.response?.data?.message,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	return (
		<AddMockFormWrapper
			data-testid='add-mock-form'
			onSubmit={handleSubmit(createNewMock)}
		>
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
			<For each='accordionItem' index='idx' of={accordionData}>
				<AccordionWrapper key={accordionItem.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel-${idx}-content`}
						id={`panel-${idx}-header`}
					>
						<AccordionHeader>{accordionItem.title}</AccordionHeader>
					</AccordionSummary>
					<AccordionDetails>{accordionItem.content}</AccordionDetails>
				</AccordionWrapper>
			</For>
			<ButtonWrapper>
				<ActionButton
					label='Create mock'
					dataTestid='create-mock-button'
					background='bg-green-500'
					color='text-white'
					additionalStyles='ml-4 break-normal'
					width='w-1/3'
					type='submit'
				/>
				<ActionButton
					label='Reset'
					dataTestid='reset-button'
					background='bg-red-500'
					color='text-white'
					width='w-1/3'
					additionalStyles='mx-0 break-normal'
					onclickHandler={(e) => {
						e.preventDefault();
						clearMockData();
					}}
				/>
			</ButtonWrapper>
		</AddMockFormWrapper>
	);
}
