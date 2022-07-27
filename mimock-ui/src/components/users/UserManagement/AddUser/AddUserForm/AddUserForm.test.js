import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { getUserRoles, addNewUser } from 'services/users';
import AddUserForm from './AddUserForm';

const actualNotification = jest.requireActual('hooks/useNotification');

jest.mock('services/users');
jest.mock('react-notifications-component', () => {
	const Store = {
		addNotification: jest.fn(),
	};
	return { Store };
});

const mockedNavigation = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigation,
}));

describe('AddUserForm', () => {
	beforeEach(() => {
		getUserRoles.mockResolvedValue([
			{
				roleName: 'ADMIN',
				roleDescription:
					'Administrator can create and manage mocks, and also has user management privileges',
			},
			{
				roleName: 'MANAGER',
				roleDescription:
					'Manager can create and manage mocks, but cannot manage users',
			},
			{ roleName: 'VIEWER', roleDescription: 'Viewer can only view mocks' },
		]);

		addNewUser.mockResolvedValue({});
	});

	it('should render add user form with all elements', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('user-role-error')).not.toBeInTheDocument();

		expect(getByTestId('add-user-form')).toBeInTheDocument();

		expect(getByTestId('input-name')).toBeInTheDocument();
		expect(getByTestId('input-userName')).toBeInTheDocument();
		expect(getByTestId('input-password')).toBeInTheDocument();
		expect(getByTestId('input-confirmPassword')).toBeInTheDocument();
		expect(getByTestId('input-role')).toBeInTheDocument();

		expect(queryByTestId('input-error-name')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-userName')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-password')).not.toBeInTheDocument();
		expect(
			queryByTestId('input-error-confirmPassword')
		).not.toBeInTheDocument();

		expect(getByTestId('add-user-submit-button')).toBeInTheDocument();
		expect(getByTestId('add-user-reset-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error banner when getUserRoles call fails', async () => {
		getUserRoles.mockRejectedValue(new Error('Error'));

		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getByTestId('user-role-error')).toBeInTheDocument();
		expect(getByTestId('user-role-error')).toHaveTextContent(
			'Failed to fetch user roles'
		);

		expect(queryByTestId('add-user-form')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display validation errors when inputs are not valid', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('user-role-error')).not.toBeInTheDocument();

		expect(getByTestId('add-user-form')).toBeInTheDocument();

		expect(getByTestId('input-container-name')).toBeInTheDocument();
		expect(getByTestId('input-container-userName')).toBeInTheDocument();
		expect(getByTestId('input-container-password')).toBeInTheDocument();
		expect(getByTestId('input-container-role')).toBeInTheDocument();

		expect(getByTestId('input-name')).toBeInTheDocument();
		expect(getByTestId('input-userName')).toBeInTheDocument();
		expect(getByTestId('input-password')).toBeInTheDocument();
		expect(getByTestId('input-confirmPassword')).toBeInTheDocument();
		expect(getByTestId('input-role')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('add-user-submit-button'));
		});

		expect(getByTestId('input-error-name')).toBeInTheDocument();
		expect(getByTestId('input-error-userName')).toBeInTheDocument();
		expect(getByTestId('input-error-password')).toBeInTheDocument();

		expect(getByTestId('add-user-reset-button')).toBeInTheDocument();
		expect(mockedNavigation).toHaveBeenCalledTimes(0);

		expect(addNewUser).not.toHaveBeenCalled();

		expect(container).toMatchSnapshot();
	});

	it('should call addNewUser api when all inputs are valid', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');

		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('user-role-error')).not.toBeInTheDocument();

		expect(getByTestId('add-user-form')).toBeInTheDocument();

		expect(getByTestId('input-container-name')).toBeInTheDocument();
		expect(getByTestId('input-container-userName')).toBeInTheDocument();
		expect(getByTestId('input-container-password')).toBeInTheDocument();
		expect(getByTestId('input-container-role')).toBeInTheDocument();

		expect(getByTestId('input-confirmPassword')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'Tester Name' },
			});
			fireEvent.change(getByTestId('input-userName'), {
				target: { value: 'tester' },
			});
			fireEvent.change(getByTestId('input-password'), {
				target: { value: 'password' },
			});
			fireEvent.click(getByTestId('add-user-submit-button'));
		});

		expect(queryByTestId('input-error-name')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-userName')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-password')).not.toBeInTheDocument();
		expect(getByTestId('input-error-confirmPassword')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-confirmPassword'), {
				target: { value: 'password' },
			});
			fireEvent.change(getByTestId('input-role'), {
				target: { value: 'MANAGER' },
			});
			fireEvent.click(getByTestId('add-user-submit-button'));
		});

		expect(getByTestId('add-user-reset-button')).toBeInTheDocument();

		expect(addNewUser).toHaveBeenCalledTimes(1);
		expect(addNewUser).toHaveBeenCalledWith({
			name: 'Tester Name',
			userName: 'tester',
			password: 'password',
			userRole: 'MANAGER',
		});
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'User tester added successfully',
			title: 'New user added successfully',
			type: 'success',
		});
		expect(mockedNavigation).toHaveBeenCalledTimes(1);
		expect(mockedNavigation).toHaveBeenCalledWith(-1);

		expect(container).toMatchSnapshot();
	});

	it('should reset form on clicking reset button', async () => {
		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('user-role-error')).not.toBeInTheDocument();

		expect(getByTestId('add-user-form')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'Tester Name' },
			});
			fireEvent.change(getByTestId('input-userName'), {
				target: { value: 'tester' },
			});
			fireEvent.change(getByTestId('input-password'), {
				target: { value: 'password' },
			});
			fireEvent.change(getByTestId('input-confirmPassword'), {
				target: { value: 'password' },
			});
		});

		expect(queryByTestId('input-error-name')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-userName')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-password')).not.toBeInTheDocument();
		expect(
			queryByTestId('input-error-confirmPassword')
		).not.toBeInTheDocument();

		await act(async () => {
			fireEvent.click(getByTestId('add-user-reset-button'));
		});

		expect(getByTestId('input-name')).toHaveValue('');
		expect(getByTestId('input-userName')).toHaveValue('');
		expect(getByTestId('input-password')).toHaveValue('');
		expect(getByTestId('input-confirmPassword')).toHaveValue('');

		expect(getByTestId('add-user-submit-button')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should show error notification when addNewUser api call fails', async () => {
		const notificationSpy = jest.spyOn(actualNotification, 'default');
		addNewUser.mockRejectedValueOnce({
			response: {
				data: {
					message: 'User already exists',
				},
			},
		});

		let tree;
		await act(async () => {
			tree = await render(<AddUserForm />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(queryByTestId('user-role-error')).not.toBeInTheDocument();

		expect(getByTestId('add-user-form')).toBeInTheDocument();

		expect(getByTestId('input-container-name')).toBeInTheDocument();
		expect(getByTestId('input-container-userName')).toBeInTheDocument();
		expect(getByTestId('input-container-password')).toBeInTheDocument();
		expect(getByTestId('input-container-role')).toBeInTheDocument();

		expect(getByTestId('input-confirmPassword')).toBeInTheDocument();

		await act(async () => {
			fireEvent.change(getByTestId('input-name'), {
				target: { value: 'Tester Name' },
			});
			fireEvent.change(getByTestId('input-userName'), {
				target: { value: 'tester' },
			});
			fireEvent.change(getByTestId('input-password'), {
				target: { value: 'password' },
			});
			fireEvent.change(getByTestId('input-confirmPassword'), {
				target: { value: 'password' },
			});
			fireEvent.change(getByTestId('input-role'), {
				target: { value: 'MANAGER' },
			});
			fireEvent.click(getByTestId('add-user-submit-button'));
		});

		expect(queryByTestId('input-error-name')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-userName')).not.toBeInTheDocument();
		expect(queryByTestId('input-error-password')).not.toBeInTheDocument();
		expect(
			queryByTestId('input-error-confirmPassword')
		).not.toBeInTheDocument();

		expect(getByTestId('add-user-reset-button')).toBeInTheDocument();

		expect(addNewUser).toHaveBeenCalledTimes(1);
		expect(addNewUser).toHaveBeenCalledWith({
			name: 'Tester Name',
			userName: 'tester',
			password: 'password',
			userRole: 'MANAGER',
		});
		expect(notificationSpy).toHaveBeenCalledTimes(1);
		expect(notificationSpy).toHaveBeenCalledWith({
			animationIn: 'animate__slideInRight',
			animationOut: 'animate__slideOutRight',
			message: 'User already exists',
			title: 'Failed to add new user',
			type: 'danger',
		});

		expect(container).toMatchSnapshot();
	});

	describe('InputFieldErrors', () => {
		it('show min error for name', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-name'), {
					target: { value: 'Tes' },
				});
			});

			expect(
				getByText('Name must be at least 4 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});

		it('show max error for name', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-name'), {
					target: { value: 'eTFtwWffjetjybJFDTEYccHigJgBZS' },
				});
			});

			expect(
				getByText('Name must be at most 24 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});

		it('show min error for username', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-userName'), {
					target: { value: 'use' },
				});
			});

			expect(
				getByText('Username must be at least 4 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});

		it('show max error for username', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-userName'), {
					target: { value: 'dUHPD3niVAQSTqBxLUPhNw9CT36DHf' },
				});
			});

			expect(
				getByText('Username must be at most 24 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});

		it('show min error for password', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-password'), {
					target: { value: 'pass12' },
				});
			});

			expect(
				getByText('Password must be at least 8 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});

		it('show max error for password', async () => {
			let tree;
			await act(async () => {
				tree = await render(<AddUserForm />);
			});

			const { getByTestId, getByText, container } = tree;

			await act(async () => {
				fireEvent.change(getByTestId('input-password'), {
					target: {
						value:
							'XWG_D#w=E=;LzG((=:qC)5DmH-V_n.gU==UQ3Pp8C4tya:RVFRbxn3bB?3tfX*KU:UY8E7q3=6/X%wrf&fyrqK-GYxT%F+Eyf3t:,jp=&-BZ66kjEb;uzk&kWP*#:5YJH',
					},
				});
			});

			expect(
				getByText('Password must be at most 128 characters')
			).toBeInTheDocument();

			expect(container).toMatchSnapshot();
		});
	});
});
