import React from 'react';
import { render, act } from '@testing-library/react';
import { getAllUsers } from 'services/users';
import UserManagement from './UserManagement';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: mockedRecoilFn.mockImplementation(() => [false, jest.fn()]),
	};
});
jest.mock('services/users');
jest.mock('react-router-dom');

describe('UserManagement', () => {
	beforeEach(() => {
		getAllUsers.mockResolvedValue([
			{
				userId: '1',
				userName: 'user1',
				name: 'User 1',
				userRole: 'ADMIN',
				isUserActive: true,
				userCreatedAt: '2022-04-28 19:42:21',
			},
		]);
	});

	it('should render user management', async () => {
		let tree;
		await act(async () => {
			tree = await render(<UserManagement />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('user-management')).toBeInTheDocument();
		expect(getByTestId('user-management-header')).toBeInTheDocument();
		expect(getByTestId('user-table')).toBeInTheDocument();
		expect(getByTestId('add-user-btn')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
