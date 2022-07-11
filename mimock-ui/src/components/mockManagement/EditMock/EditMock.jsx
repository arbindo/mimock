import React, { useState, useEffect } from 'react';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { getMock } from 'services/mockManagement/getMockById.service';
import AddMock from '../AddMock';
import { mockManagementConstants } from '../constants';

export default function EditMock() {
	const [, setMockData] = useRecoilState(newMockFieldsAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		setIsLoading(true);
		getMock(searchParams.get('mockId'))
			.then((data) => {
				setMockData({ ...data, mode: mockManagementConstants.mode.EDIT });
			})
			.catch(() => {});
		setIsLoading(false);
	}, []);

	return (
		<If condition={!isLoading}>
			<AddMock mode={mockManagementConstants.mode.EDIT} />
		</If>
	);
}
