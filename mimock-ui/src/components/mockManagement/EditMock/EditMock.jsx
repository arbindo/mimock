import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { ErrorAlert } from 'styles';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { getMock } from 'services/mockManagement/getMockById.service';
import { mockManagementConstants } from 'constants/mockManagementConstants';
import AddMock from '../AddMock';

export default function EditMock() {
	const [, setMockData] = useRecoilState(newMockFieldsAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();
	const [error, setError] = useState({
		isError: false,
		message: '',
	});

	useEffect(() => {
		setIsLoading(true);
		getMock(searchParams.get('mockId'))
			.then((data) => {
				if (
					data.entityStatus !== mockManagementConstants.ENTITY_STATUS.ACTIVE
				) {
					throw new Error('Mock is not ACTIVE');
				}
				setIsLoading(false);
				setMockData({ ...data, mode: mockManagementConstants.mode.EDIT });
			})
			.catch((e) => {
				setIsLoading(false);
				setError({
					isError: true,
					message:
						e.response?.data?.message || e.message || "Couldn't load mock",
				});
			});
	}, []);

	return (
		<If condition={!isLoading}>
			<Choose>
				<When condition={error.isError}>
					<ErrorAlert
						title='Error'
						subTitle='Failed to edit mock'
						message={error.message}
						dataTestId='edit-error-banner'
					/>
				</When>
				<Otherwise>
					<AddMock mode={mockManagementConstants.mode.EDIT} />
				</Otherwise>
			</Choose>
		</If>
	);
}
