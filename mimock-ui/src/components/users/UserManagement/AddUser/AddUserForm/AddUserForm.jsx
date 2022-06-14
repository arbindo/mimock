import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonVariants } from 'styles/Button';
import { getUserRoles, addNewUser } from 'services/users';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import { formInputData } from './formInputData.js';
import {
	FormContainer,
	InputContainer,
	Label,
	FormInput,
	UserRoleInput,
	ButtonContainer,
	SubmitButton,
	ResetButton,
	InputBlock,
	ErrorMessage,
	Error,
} from './AddUserForm.style';

function AddUserForm() {
	const {
		register,
		handleSubmit,
		watch,
		setFocus,
		reset,
		clearErrors,
		formState: { errors, isSubmitSuccessful },
	} = useForm({ mode: 'all', reValidateMode: 'onChange' });

	const password = useRef({});
	password.current = watch('password', '');

	const [userRoles, setUserRoles] = useState([]);
	const [role, setRole] = useState('');
	const [roleFetchError, setRoleFetchError] = useState(false);

	useEffect(() => {
		setFocus('name');
		getUserRoles()
			.then((roles) => {
				setRole(roles[0].roleName);
				setUserRoles(roles.map((role) => role.roleName));
			})
			.catch(() => {
				setRoleFetchError(true);
			});
	}, []);

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful, reset]);

	const addUser = (formData) => {
		const { name, userName, password } = formData;
		const userData = {
			name,
			userName,
			password,
			userRole: role,
		};
		addNewUser(userData)
			.then(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'New user added successfully',
					message: `User ${userData.userName} added successfully`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			})
			.catch(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to add new user',
					message: 'Please try again',
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});
			});
	};

	return (
		<Choose>
			<When condition={roleFetchError}>
				<Error data-testid='user-role-error'>Failed to fetch user roles</Error>
			</When>
			<Otherwise>
				<FormContainer
					data-testid='add-user-form'
					onSubmit={handleSubmit(addUser)}
				>
					<For each='item' of={formInputData}>
						<InputContainer
							data-testid={`input-container-${item.name}`}
							key={item.name}
						>
							<Label>{item.label}</Label>
							<Choose>
								<When condition={item.name === 'password'}>
									<InputBlock>
										<FormInput
											data-testid={`input-${item.name}`}
											type={item.type}
											placeholder={item.placeholder}
											$error={errors[item.name]}
											{...register(item.name, {
												...item.validators,
											})}
										/>
										<If condition={errors[item.name]}>
											<ErrorMessage data-testid={`input-error-${item.name}`}>
												{errors[item.name].message}
											</ErrorMessage>
										</If>
									</InputBlock>
									<InputBlock>
										<FormInput
											data-testid={`input-${item.nameConfirm}`}
											type={item.type}
											placeholder={item.placeholderConfirm}
											$error={errors[item.nameConfirm]}
											{...register(item.nameConfirm, {
												validate: (value) =>
													value === password.current ||
													'The passwords do not match',
											})}
										/>
										<If condition={errors[item.nameConfirm]}>
											<ErrorMessage
												data-testid={`input-error-${item.nameConfirm}`}
											>
												{errors[item.nameConfirm].message}
											</ErrorMessage>
										</If>
									</InputBlock>
								</When>
								<Otherwise>
									<InputBlock>
										<FormInput
											data-testid={`input-${item.name}`}
											type={item.type}
											placeholder={item.placeholder}
											$error={errors[item.name]}
											{...register(item.name, {
												...item.validators,
											})}
										/>
										<If condition={errors[item.name]}>
											<ErrorMessage data-testid={`input-error-${item.name}`}>
												{errors[item.name].message}
											</ErrorMessage>
										</If>
									</InputBlock>
								</Otherwise>
							</Choose>
						</InputContainer>
					</For>
					<If condition={userRoles}>
						<InputContainer data-testid='input-container-role'>
							<Label>User role</Label>
							<UserRoleInput
								type='select'
								value={role}
								data-testid='input-role'
								defaultValue={userRoles[0]}
								onChange={(e) => setRole(e.target.value)}
							>
								<For each='role' of={userRoles}>
									<option key={role} value={role}>
										{role}
									</option>
								</For>
							</UserRoleInput>
						</InputContainer>
					</If>
					<ButtonContainer>
						<SubmitButton
							type='submit'
							dataTestid='add-user-submit-button'
							variant={ButtonVariants.GreenButton}
							label='Submit'
							required={true}
							width='w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 sm:w-1/2'
						/>
						<ResetButton
							label='Reset'
							dataTestid='add-user-reset-button'
							variant={ButtonVariants.RedButton}
							width='w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 sm:w-1/2'
							required={true}
							onclickHandler={() => {
								clearErrors();
								reset(undefined, {
									keepError: false,
								});
							}}
						/>
					</ButtonContainer>
				</FormContainer>
			</Otherwise>
		</Choose>
	);
}

export default AddUserForm;
