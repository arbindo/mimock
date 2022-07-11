import React from 'react';
import { PropTypes } from 'prop-types';
import { IconHeader } from 'src/styles/components';
import { BiAddToQueue } from 'react-icons/bi';
import { AddMockWrapper, AddMockHeader } from './AddMock.style';
import AddMockForm from './AddMockForm';
import { mockManagementConstants } from 'constants/mockManagementConstants';

function AddMock({ mode }) {
	return (
		<AddMockWrapper data-testid='add-mock'>
			<AddMockHeader>
				<IconHeader
					icon={<BiAddToQueue />}
					title={
						mode === mockManagementConstants.mode.CREATE
							? 'Add new mock'
							: 'Edit mock'
					}
					dataTestId='add-mock-header'
					enableBackNavigation={true}
				/>
			</AddMockHeader>
			<AddMockForm mode={mode} />
		</AddMockWrapper>
	);
}

AddMock.propTypes = {
	mode: PropTypes.string.isRequired,
};

export default AddMock;
