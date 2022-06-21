import React from 'react';
import { render, act } from '@testing-library/react';
import PlatformSettings from './PlatformSettings';

jest.mock('react-router-dom');

describe('PlatformSettings', () => {
	it('should render platform settings', async () => {
		let tree;
		await act(async () => {
			tree = await render(<PlatformSettings />);
		});

		const { getByTestId, container } = tree;

		expect(getByTestId('psettings-container')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
