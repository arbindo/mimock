import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getMockById,
	archiveMock,
	unarchiveMock,
	deleteMockById,
} from 'services/mockManagement/mockManagement.service';
import { Cookies } from 'react-cookie';
import { globalConstants } from 'constants/globalConstants';
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
	const cookies = new Cookies();
	const { testIds, confirmationModal } = constants;
	// #endregion

	// #region States
	const [mock, setMock] = useState(null);
	const [mockId, setMockId] = useState(null);
	const [badgeColor, setBadgeColor] = useState('');
	const [showDeletionModal, setShowDeletionModal] = useState(false);
	const [deletingMock, setDeletingMock] = useState(false);
	const [hideDetailActionsToolbar, setHideDetailActionsToolbar] =
		useState(false);
	// #endregion

	// #region Common Hooks
	const navigate = useNavigate();
	const location = useLocation();

	const authCookieRef = useRef('');
	const csrfCookieRef = useRef('');

	useEffect(() => {
		authCookieRef.current = cookies.get(globalConstants.AUTH_TOKEN_COOKIE_NAME);
		csrfCookieRef.current = cookies.get(globalConstants.XSRF_COOKIE_NAME);
	}, []);

	useEffect(() => {
		if (location.pathname != undefined) {
			const mockIdString = location.pathname.split('/detail/')[1];
			setMockId(mockIdString);
			getMockById(mockIdString, authCookieRef)
				.then((res) => {
					setMock(res.data.data);
					const color = decideBadgeColor(res.data.data.httpMethod.method);
					setBadgeColor(color);
				})
				.catch((err) => console.log(err));
			try {
				const userDetails = getUserDetails();
				const isReadOnlyUser =
					userDetails && userDetails.userRole === 'ROLE_VIEWER';
				setHideDetailActionsToolbar(isReadOnlyUser);
			} catch (e) {
				console.log(e);
				setHideDetailActionsToolbar(false);
			}
		}
	}, []);
	// #endregion

	// #region Handler functions
	const performArchiveMockOperation = () => {
		archiveMock(mockId, authCookieRef)
			.then((res) => {
				if (res.status == 200) {
					navigate(`/mimock-ui/mocks`);
					useNotification({
						type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
						title: 'Archive success',
						message: `${res.data.data.mockName}: ${res.data.message}`,
						animationIn: 'animate__bounceIn',
						animationOut: 'animate__bounceOut',
					});
				}
				console.log(res.status, res.data);
			})
			.catch((err) => {
				console.log(err);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to archive mock',
					message: `${err.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const performUnarchiveMockOperation = () => {
		unarchiveMock(mockId, authCookieRef)
			.then((res) => {
				if (res.status == 200) {
					navigate(`/mimock-ui/mocks`);
					useNotification({
						type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
						title: 'Unarchive success',
						message: `${res.data.data.mockName}: ${res.data.message}`,
						animationIn: 'animate__bounceIn',
						animationOut: 'animate__bounceOut',
					});
				}
				console.log(res.status, res.data);
			})
			.catch((err) => {
				console.log(err);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to unarchive mock',
					message: `${err.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const performDeleteMockOperation = () => {
		setShowDeletionModal(true);
	};

	const handleDeleteMock = async () => {
		setDeletingMock(true);
		await deleteMockById(mockId, authCookieRef)
			.then((res) => {
				setDeletingMock(false);
				setShowDeletionModal(false);
				if (res.status == 204) {
					navigate(`/mimock-ui/mocks`);
					useNotification({
						type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
						title: 'Deletion success',
						message: `Deleted resource successfully!`,
						animationIn: 'animate__bounceIn',
						animationOut: 'animate__bounceOut',
					});
				}
				console.log(res.status, res.data);
			})
			.catch((err) => {
				console.log(err);
				setDeletingMock(false);
				setShowDeletionModal(false);
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: 'Failed to delete mock',
					message: `${err.message}`,
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});
			});
	};

	const performEditMockOperation = () => {
		navigate(`/mimock-ui/mocks/manage/edit-mock?mockId=${mockId}`);
	};
	// #endregion

	return (
		<DetailContainer data-testid={testIds.detailContainer}>
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
					performArchiveMockOperation={performArchiveMockOperation}
					performUnarchiveMockOperation={performUnarchiveMockOperation}
					performDeleteMockOperation={performDeleteMockOperation}
					performEditMockOperation={performEditMockOperation}
				/>
				<DetailHeader mock={mock} badgeColor={badgeColor} />
				<DetailContentViewer mock={mock} />
			</If>
		</DetailContainer>
	);
}

export default Detail;
