import React from 'react';
import { IconHeader } from 'src/styles/components';
import { BiAddToQueue } from 'react-icons/bi';
import { AddMockWrapper, AddMockHeader } from './AddMock.style';
import AddMockForm from './AddMockForm/AddMockForm';

export default function AddMock() {
	return (
		<AddMockWrapper data-testid='add-mock'>
			<AddMockHeader>
				<IconHeader
					icon={<BiAddToQueue />}
					title='Add new mock'
					dataTestId='add-mock-header'
					enableBackNavigation={true}
				/>
			</AddMockHeader>
			<AddMockForm />
		</AddMockWrapper>
	);
}
