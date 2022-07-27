import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ButtonVariants } from 'styles/Button';
import { getUserRoles, addNewUser } from 'services/users';
import useNotification from 'hooks/useNotification';
import { notificationTypes } from 'constants/notificationConstants';
import { ValidatedInput } from 'styles';
import { formInputData } from './formInputData.js';
import {
	FormContainer,
	InputContainer,
	Label,
	ButtonContainer,
	SubmitButton,
	ResetButton,
	Error,
} from './AddUserForm.style';
import UserRoleOptions from 'components/users/UserManagement/EditUser/UserDetails/UserRole/UserRoleOptions';

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

	const navigate = useNavigate();
	const [userRoles, setUserRoles] = useState([]);
	const [role, setRole] = useState('');
	const [roleFetchError, setRoleFetchError] = useState(false);
	const [selectedRoleDescription, setSelectedRoleDescription] = useState('');

	useEffect(() => {
		setFocus('name');
		getUserRoles()
			.then((roles) => {
				setRole(roles[0].roleName);
				setUserRoles(roles);
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
				navigate(-1);
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to add new user',
					message: err.response?.data?.message,
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
									<ValidatedInput
										type='password'
										name={item.name}
										dataTestId={`input-${item.name}`}
										placeHolder={item.placeholder}
										error={errors[item.name] ? true : false}
										errorMessage={
											errors[item.name] ? errors[item.name].message : ''
										}
										register={register(item.name, {
											...item.validators,
										})}
									/>
									<ValidatedInput
										type='password'
										name={item.nameConfirm}
										dataTestId={`input-${item.nameConfirm}`}
										placeHolder={item.placeholderConfirm}
										error={errors[item.nameConfirm] ? true : false}
										errorMessage={
											errors[item.nameConfirm]
												? errors[item.nameConfirm].message
												: ''
										}
										register={register(item.nameConfirm, {
											validate: (value) =>
												value === password.current ||
												'The passwords do not match',
										})}
									/>
								</When>
								<Otherwise>
									<ValidatedInput
										name={item.name}
										dataTestId={`input-${item.name}`}
										placeHolder={item.placeholder}
										error={errors[item.name] ? true : false}
										errorMessage={
											errors[item.name] ? errors[item.name].message : ''
										}
										register={register(item.name, {
											...item.validators,
										})}
									/>
								</Otherwise>
							</Choose>
						</InputContainer>
					</For>
					<If condition={userRoles}>
						<InputContainer data-testid='input-container-role'>
							<Label>User role</Label>
							<UserRoleOptions
								margin='mx-4'
								currentUserRole={userRoles[0]?.roleName}
								roles={userRoles}
								selectedRole={role}
								setSelectedRole={setRole}
								enableRoleUpdate={false}
								selectedRoleDescription={selectedRoleDescription}
								setSelectedRoleDescription={setSelectedRoleDescription}
							/>
						</InputContainer>
					</If>
					<ButtonContainer>
						<SubmitButton
							type='submit'
							dataTestid='add-user-submit-button'
							variant={ButtonVariants.TealButton}
							label='Submit'
							width='w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 sm:w-1/2'
						/>
						<ResetButton
							label='Reset'
							dataTestid='add-user-reset-button'
							variant={ButtonVariants.RoseButton}
							width='w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 sm:w-1/2'
							onclickHandler={(e) => {
								e.preventDefault();

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
