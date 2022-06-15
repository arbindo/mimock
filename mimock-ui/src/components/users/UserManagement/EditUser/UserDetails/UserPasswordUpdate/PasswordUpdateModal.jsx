import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { ValidatedInput } from 'styles';
import { ButtonVariants } from 'styles/Button';
import editUserDetailsAtom from 'atoms/editUserDetailsAtom';
import { updatePassword } from 'services/users';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import {
	PasswordModalWrapper,
	Header,
	PasswordContainer,
	Label,
	ButtonContainer,
	LoaderStyle,
	PasswordUpdateForm,
	CancelButton,
	UpdateButton,
} from './PasswordUpdateModal.style';

function PasswordUpdateModal({ userName }) {
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);
	const [updatingPassword, setUpdatingPassword] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	const password = useRef({});
	password.current = watch('password', '');

	const validator = {
		required: 'Password is required',
		minLength: {
			value: 8,
			message: 'Password must be at least 8 characters',
		},
		maxLength: {
			value: 128,
			message: 'Password must be at most 128 characters',
		},
	};

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful, reset]);

	const passwordContainer = (
		label,
		name,
		placeHolder,
		testId,
		registerValues
	) => {
		return (
			<PasswordContainer key={testId} data-testid={`${testId}-container`}>
				<Label>{label}</Label>
				<ValidatedInput
					type='password'
					name={name}
					dataTestId={`${testId}-input`}
					placeHolder={placeHolder}
					error={errors[name] ? true : false}
					errorMessage={errors[name] ? errors[name].message : ''}
					register={registerValues}
				/>
			</PasswordContainer>
		);
	};

	const closeModal = () => {
		setUserInfo({
			...userInfo,
			showPasswordUpdateModal: false,
		});
	};

	const updatePasswordHandler = (formData) => {
		const { password } = formData;
		setUpdatingPassword(true);

		updatePassword(userName, password)
			.then(() => {
				setUpdatingPassword(false);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Success',
					message: 'Password updated successfully',
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
				closeModal();
			})
			.catch(() => {
				setUpdatingPassword(false);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Please try again',
					message: 'Failed to update password',
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			});
	};

	return (
		<PasswordModalWrapper data-testid='password-update-modal'>
			<Header data-testid='password-update-header'>
				Updating password for {userName}
			</Header>
			<Choose>
				<When condition={updatingPassword}>
					<Header data-testid='password-update-loading-header'>
						Please wait...
					</Header>
					<PropagateLoader
						loading={updatingPassword}
						color='teal'
						size={30}
						css={LoaderStyle}
					/>
				</When>
				<Otherwise>
					<PasswordUpdateForm onSubmit={handleSubmit(updatePasswordHandler)}>
						{passwordContainer(
							'New Password',
							'password',
							'Enter password',
							'new-password',
							register('password', validator)
						)}
						{passwordContainer(
							'Confirm password',
							'confirmPassword',
							'Confirm password',
							'confirm-password',
							register('confirmPassword', {
								validate: (value) =>
									value === password.current || 'The passwords do not match',
							})
						)}
						<ButtonContainer>
							<UpdateButton
								type='submit'
								dataTestid='password-update-confirm-button'
								variant={ButtonVariants.GreenButton}
								label='Update'
								required={true}
								width='w-1/2'
							/>
							<CancelButton
								type='button'
								dataTestid='password-update-cancel-button'
								variant={ButtonVariants.RedButton}
								label='Cancel'
								width='w-1/2'
								required={true}
								onclickHandler={() => {
									closeModal();
								}}
							/>
						</ButtonContainer>
					</PasswordUpdateForm>
				</Otherwise>
			</Choose>
		</PasswordModalWrapper>
	);
}

PasswordUpdateModal.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default PasswordUpdateModal;
