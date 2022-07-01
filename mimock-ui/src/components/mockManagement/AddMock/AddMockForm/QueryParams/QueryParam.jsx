import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import { VscListFlat, VscCode } from 'react-icons/vsc';
import { ValidatedInput } from 'styles';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import {
	QueryParamsWrapper,
	InputContainer,
	AddIcon,
	DeleteIcon,
	ActionToolTip,
	NoQueryParam,
	NoQueryParamLabel,
	QueryParamTextWrapper,
	QueryParamText,
} from './QueryParam.style';

export default function QueryParam() {
	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);
	const [viewMode, setViewMode] = useState('text');
	const [queryParam, setQueryParam] = useState('');
	const { register, control, watch } = useForm({
		mode: 'all',
	});
	const watchFieldArray = watch('queryParam');

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'queryParam',
	});

	const buildQueryParams = () => {
		if (!watchFieldArray || watchFieldArray.length === 0) {
			return;
		}

		const params = watchFieldArray.map((field) => {
			if (field.key && field.value) {
				return field.key + '=' + field.value;
			} else {
				return '';
			}
		});

		if (params && params.length) {
			const queryParams = params.join('&');
			setMockData({
				...mockData,
				queryParams,
			});
			setQueryParam(queryParams);
		} else {
			setQueryParam(params.join(''));
		}
	};

	const input = (id, index) => {
		return (
			<InputContainer key={id}>
				<ValidatedInput
					name={`queryParam.[${index}].key`}
					dataTestId={`queryParam.[${index}].key`}
					placeHolder='key'
					register={register(`queryParam.[${index}].key`, {
						required: 'Key is required',
					})}
				/>
				<ValidatedInput
					name={`queryParam.[${index}].value`}
					dataTestId={`queryParam.[${index}].value`}
					placeHolder='value'
					register={register(`queryParam.[${index}].value`, {
						required: 'Value is required',
					})}
				/>
				<ActionToolTip
					data-testid='user-role-tooltip'
					key={'tooltip-remove'}
					title={'Remove param'}
					arrow
				>
					<IconButton
						onClick={() => {
							remove(index);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</ActionToolTip>
			</InputContainer>
		);
	};

	return (
		<QueryParamsWrapper>
			<ToggleButtonGroup
				value={viewMode}
				color='primary'
				exclusive
				type='submit'
				onChange={() => {
					buildQueryParams();
					setViewMode(viewMode === 'text' ? 'code' : 'text');
				}}
			>
				<ToggleButton value='text'>
					<VscListFlat />
				</ToggleButton>
				<If condition={watchFieldArray && watchFieldArray.length !== 0}>
					<ToggleButton value='code'>
						<VscCode />
					</ToggleButton>
				</If>
			</ToggleButtonGroup>
			<ActionToolTip
				data-testid='user-role-tooltip'
				key={'tooltip-add'}
				title={'Add new query param'}
				arrow
			>
				<IconButton
					onClick={() => {
						append({ key: '', value: '' });
					}}
				>
					<AddIcon />
				</IconButton>
			</ActionToolTip>
			<If condition={fields.length === 0}>
				<NoQueryParam>
					<NoQueryParamLabel>No query params added</NoQueryParamLabel>
				</NoQueryParam>
			</If>
			<Choose>
				<When condition={viewMode === 'text'}>
					<For each='field' index='idx' of={fields}>
						{input(field.id, idx)}
					</For>
				</When>
				<Otherwise>
					<If condition={watchFieldArray.length !== 0}>
						<QueryParamTextWrapper>
							<QueryParamText
								rows={5}
								cols={50}
								disabled
								value={queryParam}
							></QueryParamText>
						</QueryParamTextWrapper>
					</If>
				</Otherwise>
			</Choose>
		</QueryParamsWrapper>
	);
}
