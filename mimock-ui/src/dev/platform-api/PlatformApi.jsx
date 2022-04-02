import { getToken } from 'services/authentication/authentication.service';
import React, { useState } from 'react';
import { CustomButton } from 'styles';
import PlatformApiOperations from './PlatformApiOperations.jsx';

const PlatformApi = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);

	const login = async () => {
		if (username == '' || password == '') {
			alert('Username and password required');
			return;
		}

		await getToken(username, password)
			.then((response) => {
				setToken(response.data.token);
				setLoggedIn(true);
				setUsername('');
				setPassword('');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const logout = async () => {
		setToken('');
		setLoggedIn(false);
	};

	return (
		<div data-testid='platform-api' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='flex justify-center'>
					<div className='font-sans font-bold mb-10 ml-6 dark:text-gray-100'>
						Mimock Platform APIs
					</div>
				</div>
				<If condition={loggedIn}>
					<div className='font-sans text-lg mb-2 mt-2 p-2 dark:text-gray-100'>
						<span className='underline cursor-pointer' onClick={() => logout()}>
							Logout
						</span>
					</div>
				</If>
				<If condition={!loggedIn}>
					<div className='overflow-hidden px-3 py-10 bg-white-200 flex justify-center'>
						<form
							className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
							onSubmit={(e) => e.preventDefault()}
						>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='username'
								>
									Username
								</label>
								<input
									className='shadow appearance-none text-base border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='username'
									type='text'
									placeholder='bruce'
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className='mb-6'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='shadow appearance-none text-base border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									placeholder='batcave'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<CustomButton
									background='bg-gray-800'
									color='text-white'
									label='LOGIN'
									onclickHandler={() => {
										login();
									}}
								></CustomButton>
							</div>
						</form>
					</div>
				</If>
				<PlatformApiOperations loggedIn={loggedIn} token={token} />
			</div>
		</div>
	);
};

export default PlatformApi;
