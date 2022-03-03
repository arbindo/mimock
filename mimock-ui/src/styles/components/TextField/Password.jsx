import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordField() {
	const [values, setValues] = useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	return (
		<FormControl
			data-testid='password-textfield'
			style={{ width: '80%' }}
			variant='outlined'
		>
			<InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
			<OutlinedInput
				data-testid='outlined-password-input'
				id='outlined-adornment-password'
				type={values.showPassword ? 'text' : 'password'}
				value={values.password}
				onChange={handleChange('password')}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							data-testid='show-password-icon'
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							edge='end'
						>
							<Choose>
								<When condition={values.showPassword}>
									<VisibilityOff />
								</When>
								<Otherwise>
									<Visibility />
								</Otherwise>
							</Choose>
						</IconButton>
					</InputAdornment>
				}
				label='Password'
			/>
		</FormControl>
	);
}

export default PasswordField;
