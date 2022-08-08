import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getMockById,
	archiveMock,
	unarchiveMock,
	deleteMockById,
} from 'services/mockManagement/mockManagement.service';
import { ErrorAlert } from 'styles';
import { DetailContainer } from './Detail.style';
import { decideBadgeColor } from 'utils/badgeColor.js';
import { notificationTypes } from 'constants/notificationConstants';
import useNotification from 'hooks/useNotification';
import { ConfirmationModal } from 'components/common/Modals';
import { getUserDetails } from 'utils/jwtUtils';
import DetailToolbar from './detailtoolbar/DetailToolbar';
import DetailHeader from './detailheader';
import DetailContentViewer from './detailcontentviewer';
import { constants } from './constants';

function Detail() {
	// #region Defaults
	const { testIds, confirmationModal, editPath } = constants;
	// #endregion

	// #region States
	const [mock, setMock] = useState(null);
	const [mockId, setMockId] = useState(null);
	const [badgeColor, setBadgeColor] = useState('');
	const [showDeletionModal, setShowDeletionModal] = useState(false);
	const [deletingMock, setDeletingMock] = useState(false);
	const [getMockError, setGetMockError] = useState(false);
	const [hideDetailActionsToolbar, setHideDetailActionsToolbar] =
		useState(false);
	// #endregion

	// #region Common Hooks
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const mockIdString = location.pathname.split('/detail/')[1];
		setMockId(mockIdString);
		getMockAndSetBadgeColor(mockIdString);
		try {
			const userDetails = getUserDetails();
			const isReadOnlyUser =
				userDetails && userDetails.userRole === 'ROLE_VIEWER';
			setHideDetailActionsToolbar(isReadOnlyUser);
		} catch (e) {
			console.log(e);
			setHideDetailActionsToolbar(true);
		}
	}, []);
	// #endregion

	// #region Handler functions
	const handleArchive = () => {
		archiveMock(mockId)
			.then((res) => {
				setMock(res.data.data);
				setMockId(res.data.data.id);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Archive success',
					message: `${res.data.data.mockName}: ${res.data.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to archive mock',
					message: `${err.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const handleUnArchive = () => {
		unarchiveMock(mockId)
			.then((res) => {
				setMock(res.data?.data);
				setMockId(res.data?.data?.id);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Unarchive success',
					message: `${res.data?.data?.mockName}: ${res.data?.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			})
			.catch((err) => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to unarchive mock',
					message: `${err.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const handleDelete = () => {
		setShowDeletionModal(true);
	};

	const handleDeleteMock = async () => {
		setDeletingMock(true);
		await deleteMockById(mockId)
			.then(() => {
				setDeletingMock(false);
				setShowDeletionModal(false);

				getMockAndSetBadgeColor(mockId);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Deletion success',
					message: `Deleted resource successfully!`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			})
			.catch((err) => {
				console.log(err);
				setDeletingMock(false);
				setShowDeletionModal(false);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to delete mock',
					message: err.message,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const editMock = () => {
		navigate(editPath + mockId);
	};

	const getMockAndSetBadgeColor = (mockIdString) => {
		getMockById(mockIdString)
			.then((res) => {
				setMock(res.data.data);
				const color = decideBadgeColor(res.data.data.httpMethod.method);
				setBadgeColor(color);
			})
			.catch(() => {
				setGetMockError(true);
			});
	};
	// #endregion

	return (
		<DetailContainer data-testid={testIds.detailContainer}>
			<If condition={getMockError}>
				<ErrorAlert
					title='Failed to fetch mock details.'
					subTitle='Please try again'
					dataTestId='fetch-mock-details-error'
				/>
			</If>
			<If condition={mock != null}>
				<If condition={showDeletionModal}>
					<ConfirmationModal
						message={`${confirmationModal.message} - "${mock.mockName}" ?`}
						cancelButtonLabel={confirmationModal.cancelButtonLabel}
						confirmButtonLabel={confirmationModal.confirmButtonLabel}
						loading={deletingMock}
						loadingMessage={confirmationModal.loadingMessage}
						onConfirm={async () => {
							await handleDeleteMock();
						}}
						onCancel={() => {
							setShowDeletionModal(false);
						}}
					/>
				</If>
				<DetailToolbar
					hideDetailActionsToolbar={hideDetailActionsToolbar}
					status={mock.entityStatus.status}
					performArchiveMockOperation={handleArchive}
					performUnarchiveMockOperation={handleUnArchive}
					performDeleteMockOperation={handleDelete}
					performEditMockOperation={editMock}
				/>
				<DetailHeader mock={mock} badgeColor={badgeColor} />
				<DetailContentViewer mock={mock} />
			</If>
		</DetailContainer>
	);
}

export default Detail;
