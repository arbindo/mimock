import React from 'react';
import { render } from '@testing-library/react';
import Titlebar from './Titlebar';
import { constants } from './constants';

jest.mock('react-router-dom');

describe('Titlebar', () => {
	it('should render titlebar component', async () => {
		const tree = await render(<Titlebar />);

		const { container, getByTestId } = tree;

		const titlebarContainerTestId = constants.testIds.titlebarContainer;
		const titlebarInnerContainerTestId =
			constants.testIds.titlebarInnerContainer;
		const mocksHeaderTestId = constants.testIds.mocksHeader;
		const searchFieldTestId = constants.testIds.searchField;

		expect(getByTestId(titlebarContainerTestId)).toBeInTheDocument();
		expect(getByTestId(titlebarInnerContainerTestId)).toBeInTheDocument();
		expect(getByTestId(mocksHeaderTestId)).toBeInTheDocument();
		expect(getByTestId(searchFieldTestId)).toBeInTheDocument();
		expect(getByTestId(searchFieldTestId)).toHaveClass('hidden');

		expect(container).toMatchSnapshot();
	});
});
