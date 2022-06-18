import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { routes } from 'constants/routes';
import { deleteUser } from 'services/users';
import { ConfirmationModal } from 'components/common/Modals';
import useNotification from 'hooks/useNotification';
import deletionModalAtom from 'atoms/deletionModalAtom';
import { notificationTypes } from 'constants/notificationConstants';
import { ActionsWrapper, Options } from './Actions.style';

function Actions({ userName, userId }) {
	const [showDeletionModal, setShowDeletionModal] = useState(false);
	const [deletingUser, setDeletingUser] = useState(false);
	const [, setRefreshUserList] = useRecoilState(deletionModalAtom);
	const navigate = useNavigate();

	const deletionConfirmationMessage = `Are you sure you want to delete user "${userName}" ?`;
	const deletingMessage = 'Deleting user. Please wait...';

	const options = [
		{
			name: 'edit',
			icon: <FaEdit />,
			tooltip: 'Edit User',
			onClick: () => {
				navigate(`${routes.adminRoutes.editUsers.path}?userId=${userId}`);
			},
		},
		{
			name: 'delete',
			icon: <FaTrash />,
			tooltip: 'Delete User',
			onClick: () => {
				setShowDeletionModal(true);
				setRefreshUserList(true);
			},
		},
	];

	const handleDeleteUser = async () => {
		setDeletingUser(true);

		await deleteUser(userName)
			.then(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_SUCCESS,
					title: 'Deletion successful',
					message: `User - ${userName} has been deleted`,
					animationIn: 'animate__slideInRight',
					animationOut: 'animate__slideOutRight',
				});

				setRefreshUserList(false);
				setDeletingUser(false);
				setShowDeletionModal(false);
			})
			.catch(() => {
				useNotification({
					type: notificationTypes.NOTIFICATION_TYPE_ERROR,
					title: `Failed to delete user - ${userName}`,
					message: 'Please try again',
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				});

				setRefreshUserList(false);
				setDeletingUser(false);
				setShowDeletionModal(false);
			});
	};

	return (
		<ActionsWrapper data-testid={`user-action-${userName}`}>
			<If condition={showDeletionModal}>
				<ConfirmationModal
					message={deletionConfirmationMessage}
					cancelButtonLabel='Do not delete user'
					confirmButtonLabel='Delete user'
					loading={deletingUser}
					loadingMessage={deletingMessage}
					onConfirm={async () => {
						await handleDeleteUser();
					}}
					onCancel={() => {
						setShowDeletionModal(false);
					}}
				/>
			</If>
			<Options>
				<For each='option' of={options}>
					<Tooltip key={option.name} title={option.tooltip} arrow>
						<IconButton
							key={`${option.name}-${userName}`}
							data-testid={`${option.name}-${userName}`}
							onClick={() => option.onClick(userName)}
						>
							{option.icon}
						</IconButton>
					</Tooltip>
				</For>
			</Options>
		</ActionsWrapper>
	);
}

Actions.propTypes = {
	userName: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
};

export default Actions;
