import React, { useEffect, useState, useRef } from 'react';
import { ValidatedInput } from 'styles';
import { useForm } from 'react-hook-form';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import {
	QueryParamsWrapper,
	InputContainer,
	AddIcon,
	AddToolTip,
} from './QueryParam.style';

export default function QueryParam() {
	const [viewMode, setViewMode] = useState('text');
	const [inputs, setInputs] = useState([]);
	const [codedInputs, setCodedInputs] = useState({});

	const {
		register,
		handleSubmit,
		watch,
		setFocus,
		reset,
		clearErrors,
		formState: { errors, isSubmitSuccessful, dirtyFields },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	console.log(dirtyFields);

	const input = () => {
		return (
			<InputContainer key={`input-${inputs.length}`}>
				<ValidatedInput
					name='queryParamKey'
					dataTestId={`key-${inputs.length}`}
					placeHolder='key'
					register={register(`queryParamKey${inputs.length + 1}`, {
						required: 'Key is required',
					})}
				/>
				<ValidatedInput
					name='queryParamValue'
					dataTestId={`value-${inputs.length}`}
					placeHolder='value'
					register={register(`queryParamValue${inputs.length + 1}`, {
						required: 'Value is required',
					})}
				/>
			</InputContainer>
		);
	};

	useEffect(() => {
		setInputs([...inputs, input()]);
	}, []);

	// useEffect(() => {
	// 	let inputs = {};

	// 	console.log(dirtyFields);

	// 	for (let i = 0; i < inputList.length; i++) {
	// 		console.log(dirtyFields[`queryParamKey${i + 1}`]);

	// 		inputs[dirtyFields[`queryParamKey${i + 1}`]] =
	// 			dirtyFields[`queryParamValue${i + 1}`];
	// 	}

	// 	setCodedInputs(JSON.stringify(inputs, null, 2));

	// 	console.log(codedInputs);
	// }, [dirtyFields, inputList]);

	return (
		<QueryParamsWrapper>
			<ToggleButtonGroup
				value={viewMode}
				color='primary'
				exclusive
				onChange={() => {
					setViewMode(viewMode === 'text' ? 'code' : 'text');
				}}
			>
				<ToggleButton value='text'>
					<VscListFlat />
				</ToggleButton>
				<ToggleButton value='code'>
					<VscCode />
				</ToggleButton>
			</ToggleButtonGroup>
			<Choose>
				<When condition={viewMode === 'text'}>
					<AddToolTip
						data-testid='user-role-tooltip'
						key={'tooltip'}
						title={'Add new query param'}
						arrow
					>
						<IconButton
							onClick={() => {
								setInputs([...inputs, input()]);
							}}
						>
							<AddIcon />
						</IconButton>
					</AddToolTip>
					<For each='inputItem' of={inputs}>
						{inputItem}
					</For>
				</When>
				<Otherwise>
					<textarea>{codedInputs}</textarea>
				</Otherwise>
			</Choose>
		</QueryParamsWrapper>
	);
}
