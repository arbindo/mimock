import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import { BsQuestionCircle } from 'react-icons/bs';
import { ValidatedInput } from 'styles';
import { useRecoilState } from 'recoil';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import {
	createMock,
	updateMock,
} from 'services/mockManagement/mockManagement.service';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import { mockManagementConstants } from 'constants/mockManagementConstants';
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
	LabelContainer,
	Required,
} from './AddMockForm.style';

function AddMockForm({ mode }) {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [registeredInputs, setRegisteredInputs] = useState([]);
	const [shouldRenderInputs, setShouldRenderInputs] = useState(false);

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
			responseType: mockManagementConstants.TEXTUAL_RESPONSE,
			queryParams: '',
			shouldDoExactHeaderMatching: false,
			requestHeader: '',
			requestBody: '',
			requestBodyType: 'application/json',
			statusCode: 200,
			expectedTextResponse: '',
			responseHeaders: '',
			binaryFile: null,
		});
	};

	useEffect(() => {
		if (mode) {
			setRegisteredInputs(addMockFormInputData(mockData, mode));
			setShouldRenderInputs(true);
		}
	}, [mode, mockData]);

	useEffect(() => {
		return () => clearMockData();
	}, []);

	const createNewMock = (data, route) => {
		createMock(data)
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

	const updateExistingMock = (data) => {
		updateMock(mockData.id, data)
			.then(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Mock updated successfully',
					message: `Mock ${mockData.id} has been updated`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to update mock',
					message: err?.response?.data?.message,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const processMock = (data) => {
		const { name, description, route, statusCode } = data;

		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('route', route);
		formData.append('statusCode', statusCode);
		formData.append('httpMethod', mockData.httpMethod || 'GET');
		formData.append('responseContentType', mockData.responseContentType);
		formData.append('queryParams', mockData.queryParams);
		formData.append(
			'shouldDoExactHeaderMatching',
			mockData.shouldDoExactHeaderMatching
		);
		formData.append('requestHeader', mockData.requestHeader);
		formData.append('requestBody', mockData.requestBody);
		formData.append('requestBodyType', mockData.requestBodyType);
		if (mockData.expectedTextResponse) {
			formData.append('expectedTextResponse', mockData.expectedTextResponse);
		}
		if (mockData.binaryFile) {
			formData.append('binaryFile', mockData.binaryFile);
		}
		formData.append('responseHeaders', mockData.responseHeaders);

		if (mode === mockManagementConstants.mode.CREATE) {
			createNewMock(formData, route);
		} else {
			updateExistingMock(formData);
		}
	};

	return (
		<AddMockFormWrapper
			data-testid='add-mock-form'
			onSubmit={handleSubmit(processMock)}
		>
			<If
				condition={
					shouldRenderInputs && registeredInputs && registeredInputs.length > 0
				}
			>
				<For each='item' of={registeredInputs}>
					<FormItem data-testid={`form-item-${item.name}`} key={item.name}>
						<LabelContainer>
							<FormLabel>{item.label}</FormLabel>
							<If condition={item.required}>
								<Required>*</Required>
							</If>
						</LabelContainer>
						<ValidatedInput
							name={item.name}
							dataTestId={`input-${item.name}`}
							placeHolder={item.placeholder}
							error={errors[item.name] ? true : false}
							errorMessage={errors[item.name] ? errors[item.name].message : ''}
							register={register(item.name, {
								...item.validators,
								value: mockData[item.name]?.toString(),
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
			</If>
			<HttpMethod selectedMethod={mockData.httpMethod || 'GET'} />
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
					label={
						mode === mockManagementConstants.mode.CREATE
							? 'Create mock'
							: 'Update mock'
					}
					dataTestid={
						mode === mockManagementConstants.mode.CREATE
							? 'create-mock-button'
							: 'update-mock-button'
					}
					background='bg-teal-500'
					color='text-white'
					additionalStyles='ml-0 break-normal'
					width='w-1/3'
					type='submit'
				/>
				<If condition={mode === mockManagementConstants.mode.CREATE}>
					<ActionButton
						label='Reset'
						dataTestid='reset-button'
						background='bg-rose-500'
						color='text-white'
						width='w-1/3'
						additionalStyles='mx-0 break-normal'
						onclickHandler={(e) => {
							e.preventDefault();
							clearMockData();
						}}
					/>
				</If>
			</ButtonWrapper>
		</AddMockFormWrapper>
	);
}

AddMockForm.propTypes = {
	mode: PropTypes.string.isRequired,
};

export default AddMockForm;
