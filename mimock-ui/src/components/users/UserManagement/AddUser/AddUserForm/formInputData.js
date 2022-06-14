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
			pattern: {
				value: /^[a-zA-Z ]*$/,
				message: 'Name must be alphabetic',
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
				message: 'Username must be at least 4 characters',
			},
			maxLength: {
				value: 24,
				message: 'Username must be at most 24 characters',
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
