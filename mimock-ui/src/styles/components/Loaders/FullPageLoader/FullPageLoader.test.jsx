import React from 'react';
import { render } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import FullPageLoader from './FullPageLoader';

jest.mock('recoil', () => ({
	atom: jest.fn(),
	useRecoilState: jest.fn(() => [true, jest.fn()]),
}));

describe('FullPageLoader', () => {
	it('should render FullPageLoader', async () => {
		const tree = await render(<FullPageLoader />);

		const { getByTestId } = tree;

		expect(getByTestId('fullpage-loader')).toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});

	it('should not render FullPageLoader when loading is false', async () => {
		useRecoilState.mockImplementationOnce(() => [false, jest.fn()]);

		const tree = await render(<FullPageLoader />);

		const { queryByTestId } = tree;

		expect(queryByTestId('fullpage-loader')).not.toBeInTheDocument();

		expect(document.body).toMatchSnapshot();
	});
});
