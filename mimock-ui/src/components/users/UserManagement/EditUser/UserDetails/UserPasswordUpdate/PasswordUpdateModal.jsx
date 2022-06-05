import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import PropagateLoader from 'react-spinners/PropagateLoader';
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
	PasswordInput,
	ButtonContainer,
	PasswordError,
	LoaderStyle,
	PasswordUpdateForm,
	CancelButton,
	UpdateButton,
} from './PasswordUpdateModal.style';

function PasswordUpdateModal({ userName }) {
	const [userInfo, setUserInfo] = useRecoilState(editUserDetailsAtom);
	const [updatingPassword, setUpdatingPassword] = useState(false);
	const [password, setPassword] = useState({
		newPassword: '',
		confirmPassword: '',
	});
	const [passwordError, setPasswordError] = useState({
		showError: false,
		errorMessage: '',
	});

	const newPasswordChange = (e) => {
		setPasswordError(false);
		setPassword({
			...password,
			newPassword: e.target.value,
		});
	};

	const confirmPasswordChange = (e) => {
		setPasswordError(false);
		setPassword({
			...password,
			confirmPassword: e.target.value,
		});
	};

	const passwordContainer = (label, testId, value, changeHandler) => {
		return (
			<PasswordContainer key={testId} data-testid={`${testId}-container`}>
				<Label>{label}</Label>
				<PasswordInput
					data-testid={`${testId}-input`}
					autoFocus={label === 'New Password' ? true : false}
					type='password'
					value={value}
					onChange={changeHandler}
					maxLength={128}
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

	const isPasswordValid = () => {
		if (!password.newPassword || !password.confirmPassword) {
			setPasswordError({
				showError: true,
				errorMessage: 'Please enter password to continue',
			});
			return false;
		}

		if (password.newPassword !== password.confirmPassword) {
			setPasswordError({
				showError: true,
				errorMessage: 'Passwords do not match',
			});
			return false;
		}

		if (password.newPassword.length < 8) {
			setPasswordError({
				showError: true,
				errorMessage: 'Password must be at least 8 characters long',
			});
			return false;
		}

		if (password.newPassword.length > 128) {
			setPasswordError({
				showError: true,
				errorMessage: 'Password cannot be more than 128 characters',
			});
			return false;
		}

		return true;
	};

	const updatePasswordHandler = (e) => {
		e.preventDefault();
		if (!isPasswordValid()) {
			return;
		}
		setUpdatingPassword(true);

		updatePassword(userName, password.newPassword)
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
					<PasswordUpdateForm onSubmit={updatePasswordHandler}>
						{passwordContainer(
							'New Password',
							'new-password',
							password.newPassword,
							newPasswordChange
						)}
						{passwordContainer(
							'Confirm password',
							'confirm-password',
							password.confirmPassword,
							confirmPasswordChange
						)}
						<If condition={passwordError.showError}>
							<PasswordError data-testid='password-update-error'>
								{passwordError.errorMessage}
							</PasswordError>
						</If>
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
