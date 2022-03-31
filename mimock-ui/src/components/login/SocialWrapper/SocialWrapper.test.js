import React from 'react';
import { render } from '@testing-library/react';
import SocialWrapper from './SocialWrapper';

describe('SocialWrapper', () => {
	it('should render social wrapper with all elements', async () => {
		const tree = await render(<SocialWrapper />);

		const { container, getByTestId } = tree;

		expect(getByTestId('login-social-logo')).toBeInTheDocument();

		expect(getByTestId('login-social-title').textContent).toStrictEqual(
			'MIMOCK'
		);
		expect(getByTestId('login-social-description').textContent).toStrictEqual(
			'PLATFORM TO MOCK REST ENDPOINTS'
		);

		expect(getByTestId('slack-logo')).toBeInTheDocument();
		expect(getByTestId('gh-logo')).toBeInTheDocument();

		expect(getByTestId('slack-logo')).toHaveAttribute(
			'href',
			'https://mimock.slack.com'
		);
		expect(getByTestId('gh-logo')).toHaveAttribute(
			'href',
			'https://github.com/arbindo/mimock'
		);

		expect(getByTestId('login-social-license-label')).toBeInTheDocument();
		expect(getByTestId('login-social-license-label').textContent).toStrictEqual(
			'Apache-2.0 Licensed'
		);

		expect(container).toMatchSnapshot();
	});
});
