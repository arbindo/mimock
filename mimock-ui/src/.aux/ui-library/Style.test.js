import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import Style from './Style.jsx';

describe('Style', () => {
	let tree;

	it('should render style for button, pill, card and text field', async () => {
		tree = await render(<Style />);

		const { getByTestId, container } = tree;

		expect(getByTestId('style')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should render default button 1', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-1');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 2', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-2');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 3', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-3');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 4', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-4');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 5', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-5');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 6', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-6');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render default button 7', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const defaultButton = getByTestId('default-button-test-7');
		expect(defaultButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(defaultButton);
		});

		expect(defaultButton).toMatchSnapshot();
	});

	it('should render custom button 1', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const customButton = getByTestId('custom-button-test-1');
		expect(customButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(customButton);
		});

		expect(customButton).toMatchSnapshot();
	});

	it('should render custom button 2', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const customButton = getByTestId('custom-button-test-2');
		expect(customButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(customButton);
		});

		expect(customButton).toMatchSnapshot();
	});

	it('should render icon button with label 1', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-with-label-button-test-1');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button with label 2', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-with-label-button-test-2');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button with label 3', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-with-label-button-test-3');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button with label 4', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-with-label-button-test-4');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button with label 5', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-with-label-button-test-5');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button without label 1', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-without-label-button-test-1');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button without label 2', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-without-label-button-test-2');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button without label 3', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-without-label-button-test-3');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button without label 4', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-without-label-button-test-4');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render icon button without label 5', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const iconButton = getByTestId('icon-without-label-button-test-5');
		expect(iconButton).toBeInTheDocument();

		act(() => {
			fireEvent.click(iconButton);
		});

		expect(iconButton).toMatchSnapshot();
	});

	it('should render pill 1', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const pill = getByTestId('pill-test-1');
		expect(pill).toBeInTheDocument();

		act(() => {
			fireEvent.click(pill);
		});

		expect(pill).toMatchSnapshot();
	});

	it('should render pill 2', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const pill = getByTestId('pill-test-2');
		expect(pill).toBeInTheDocument();

		act(() => {
			fireEvent.click(pill);
		});

		expect(pill).toMatchSnapshot();
	});

	it('should render pill 3', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const pill = getByTestId('pill-test-3');
		expect(pill).toBeInTheDocument();

		act(() => {
			fireEvent.click(pill);
		});

		expect(pill).toMatchSnapshot();
	});

	it('should render pill 4', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const pill = getByTestId('pill-test-4');
		expect(pill).toBeInTheDocument();

		act(() => {
			fireEvent.click(pill);
		});

		expect(pill).toMatchSnapshot();
	});

	it('should render card', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const card = getByTestId('card-test');
		expect(card).toBeInTheDocument();

		expect(card).toMatchSnapshot();
	});

	it('should render text field', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const textField = getByTestId('login-username-input');
		expect(textField).toBeInTheDocument();

		act(() => {
			fireEvent.change(textField, {
				target: { value: 'username' },
			});
		});

		act(() => {
			fireEvent.blur(textField);
		});

		act(() => {
			fireEvent.focus(textField);
		});

		expect(textField.value).toStrictEqual('username');
		expect(textField).toMatchSnapshot();
	});

	it('should render password field', async () => {
		tree = await render(<Style />);

		const { getByTestId } = tree;
		const passwordField = getByTestId('login-password-input');
		expect(passwordField).toBeInTheDocument();

		act(() => {
			fireEvent.change(passwordField, {
				target: { value: 'password' },
			});
		});

		act(() => {
			fireEvent.blur(passwordField);
		});

		act(() => {
			fireEvent.focus(passwordField);
		});

		expect(passwordField.value).toStrictEqual('password');
		expect(passwordField).toMatchSnapshot();
	});
});
