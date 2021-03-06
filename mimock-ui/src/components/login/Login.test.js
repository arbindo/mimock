import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

const mockedNavigation = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigation,
}));

jest.mock('recoil', () => ({
	atom: jest.fn(),
	useRecoilState: jest.fn(() => []),
}));

describe('Login', () => {
	it('should enter login component', async () => {
		const tree = await render(<Login />);

		const { container, getByTestId, queryByTestId } = tree;

		expect(getByTestId('login-social-wrapper')).toBeInTheDocument();
		expect(getByTestId('login-form')).toBeInTheDocument();

		expect(queryByTestId('login-error-label')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
