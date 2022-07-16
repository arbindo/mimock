import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

export const formInputData = [
	{
		name: 'name',
		label: 'Name',
		type: 'text',
		placeholder: 'Enter name',
		validators: {
			required: 'Name is required',
			minLength: {
				value: 4,
				message: 'Name must be at least 6 characters',
			},
			maxLength: {
				value: 24,
				message: 'Name must be at most 24 characters',
			},
			validate: (value) => {
				if (isAlpha(value, undefined, { ignore: ' ' })) {
					return true;
				}
				return 'Name must be alphabetic';
			},
		},
	},
	{
		name: 'userName',
		label: 'Username',
		type: 'text',
		placeholder: 'Enter username',
		validators: {
			required: 'Username is required',
			minLength: {
				value: 4,
				message: 'Username must be at least 6 characters',
			},
			maxLength: {
				value: 24,
				message: 'Username must be at most 24 characters',
			},
			validate: (value) => {
				if (isAlphanumeric(value, undefined, { ignore: '_' })) {
					return true;
				}
				return 'Username must contain only alphanumeric characters';
			},
		},
	},
	{
		name: 'password',
		nameConfirm: 'confirmPassword',
		label: 'Password',
		type: 'password',
		placeholder: 'Enter password',
		placeholderConfirm: 'Confirm password',
		validators: {
			required: 'Password is required',
			minLength: {
				value: 8,
				message: 'Password must be at least 8 characters',
			},
			maxLength: {
				value: 128,
				message: 'Password must be at most 128 characters',
			},
		},
	},
];
