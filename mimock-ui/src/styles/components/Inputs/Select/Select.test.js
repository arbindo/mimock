import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
	it('should render select input with options', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<Select
					dataTestId='select-input'
					options={['option 1', 'option 2', 'option 3']}
					defaultValue='option 1'
					onChange={() => {
						jest.fn();
					}}
				/>
			);
		});

		const { getByTestId, getAllByTestId, container } = tree;

		expect(getByTestId('select-input')).toBeInTheDocument();
		expect(getByTestId('select-input')).toHaveValue('option 1');

		expect(getAllByTestId('options')).toHaveLength(3);
		expect(getAllByTestId('options')[0]).toHaveTextContent('option 1');
		expect(getAllByTestId('options')[1]).toHaveTextContent('option 2');
		expect(getAllByTestId('options')[2]).toHaveTextContent('option 3');

		expect(container).toMatchSnapshot();
	});

	it('should change option on triggering event', async () => {
		let tree;
		await act(async () => {
			tree = await render(
				<Select
					dataTestId='select-input'
					options={['option 1', 'option 2', 'option 3']}
					defaultValue='option 1'
					onChange={() => {
						jest.fn();
					}}
				/>
			);
		});

		const { getByTestId, getAllByTestId, container } = tree;

		expect(getByTestId('select-input')).toHaveValue('option 1');

		await act(async () => {
			await fireEvent.change(getByTestId('select-input'), {
				target: { value: 'option 2' },
			});
		});

		expect(getByTestId('select-input')).toHaveValue('option 2');

		expect(getAllByTestId('options')).toHaveLength(3);
		expect(getAllByTestId('options')[0]).toHaveTextContent('option 1');
		expect(getAllByTestId('options')[1]).toHaveTextContent('option 2');
		expect(getAllByTestId('options')[2]).toHaveTextContent('option 3');

		expect(container).toMatchSnapshot();
	});
});
