import React from 'react';
import { act, render } from '@testing-library/react';
import { getMock } from 'services/mockManagement/getMockById.service';
import EditMock from './EditMock';

let mockedRecoilFn;
jest.mock('recoil', () => {
	mockedRecoilFn = jest.fn();
	return {
		atom: jest.fn(),
		useRecoilState: jest.fn(() => [{}, mockedRecoilFn]),
	};
});
jest.mock('../AddMock', () => {
	return function AddMock() {
		return <div data-testid='add-mock'>AddMock</div>;
	};
});
jest.mock('services/mockManagement/getMockById.service');
jest.mock('react-router-dom', () => ({
	useSearchParams: jest.fn(() => [
		{
			get: jest.fn(() => '1'),
		},
	]),
}));

describe('EditMock', () => {
	it('should render edit mock page when mock status is ACTIVE', async () => {
		getMock.mockResolvedValue({
			entityStatus: 'NONE',
		});

		let tree;
		await act(async () => {
			tree = render(<EditMock />);
		});

		const { getByTestId, queryByTestId, container } = tree;

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('1');
		expect(getByTestId('add-mock')).toBeInTheDocument();
		expect(queryByTestId('edit-error-banner')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display error banner when mock status is not ACTIVE', async () => {
		getMock.mockResolvedValue({
			entityStatus: 'ARCHIVED',
		});

		let tree;
		await act(async () => {
			tree = render(<EditMock />);
		});

		const { getByTestId, queryByTestId, getByText, container } = tree;

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('1');
		expect(getByTestId('edit-error-banner')).toBeInTheDocument();
		expect(getByText(/Mock is not ACTIVE/)).toBeInTheDocument();
		expect(queryByTestId('add-mock')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display error banner when fetching mock fails with error', async () => {
		getMock.mockRejectedValue({
			response: {
				data: {
					message: "Mock doesn't exist",
				},
			},
		});

		let tree;
		await act(async () => {
			tree = render(<EditMock />);
		});

		const { getByTestId, getByText, queryByTestId, container } = tree;

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('1');
		expect(getByTestId('edit-error-banner')).toBeInTheDocument();
		expect(getByText(/Mock doesn't exist/)).toBeInTheDocument();
		expect(queryByTestId('add-mock')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('should display error banner when fetching mock fails with no error data', async () => {
		getMock.mockRejectedValue({});

		let tree;
		await act(async () => {
			tree = render(<EditMock />);
		});

		const { getByTestId, getByText, queryByTestId, container } = tree;

		expect(getMock).toHaveBeenCalledTimes(1);
		expect(getMock).toHaveBeenCalledWith('1');
		expect(getByTestId('edit-error-banner')).toBeInTheDocument();
		expect(getByText(/Couldn't load mock/)).toBeInTheDocument();
		expect(queryByTestId('add-mock')).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
