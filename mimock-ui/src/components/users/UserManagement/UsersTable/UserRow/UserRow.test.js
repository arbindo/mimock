import React from 'react';
import { render, act } from '@testing-library/react';
import UserRow from './UserRow';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [true, mockedRecoilFn]),
	};
});
jest.mock('react-router-dom');

describe('UserRow', () => {
	it('should render user info', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<UserRow
					userName='user1'
					name='User 1'
					role='ADMIN'
					activationStatus={true}
					createdOn='2022-04-28 19:42:21'
				/>
			);
		});

		const { container, getByTestId } = tree;

		expect(getByTestId('user-record-user1')).toBeInTheDocument();

		expect(getByTestId('user-name')).toBeInTheDocument();
		expect(getByTestId('user-name').textContent).toBe('User 1');

		expect(getByTestId('user-userName')).toBeInTheDocument();
		expect(getByTestId('user-userName').textContent).toBe('user1');

		expect(getByTestId('user-role')).toBeInTheDocument();
		expect(getByTestId('user-role').textContent).toBe('ADMIN');
		expect(getByTestId('role-pill-ADMIN')).toBeInTheDocument();

		expect(getByTestId('user-activation-status')).toBeInTheDocument();
		expect(getByTestId('status-indicator-true')).toBeInTheDocument();

		expect(getByTestId('user-created-timestamp')).toBeInTheDocument();
		expect(getByTestId('user-created-timestamp').textContent).toBe(
			'28 Apr 2022'
		);

		expect(getByTestId('user-action-user1')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
