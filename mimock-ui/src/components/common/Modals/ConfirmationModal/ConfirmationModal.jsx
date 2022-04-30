import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {
	ModalWrapper,
	ModalBox,
	ModalMessage,
	CancelButton,
	ConfirmButton,
	LoaderStyle,
	LoadingMessage,
} from './ConfirmationModal.style';

function ConfirmationModal({
	message,
	cancelButtonLabel,
	confirmButtonLabel,
	onConfirm,
	onCancel,
	loading,
	loadingMessage,
}) {
	return (
		<Portal node={document && document.getElementById('modal')}>
			<ModalWrapper data-testid='confirmation-modal'>
				<ModalBox>
					<Choose>
						<When condition={loading}>
							<LoadingMessage data-testid='confirmation-modal-loading-message'>
								{loadingMessage}
							</LoadingMessage>
							<PacmanLoader
								data-testid='confirmation-modal-loader'
								loading={loading}
								color='teal'
								size={30}
								css={LoaderStyle}
							/>
						</When>
						<Otherwise>
							<ModalMessage data-testid='confirmation-modal-message'>
								{message}
							</ModalMessage>

							<CancelButton
								data-testid='confirmation-modal-cancel-btn'
								onClick={onCancel}
							>
								{cancelButtonLabel}
							</CancelButton>
							<ConfirmButton
								data-testid='confirmation-modal-confirm-btn'
								onClick={onConfirm}
							>
								{confirmButtonLabel}
							</ConfirmButton>
						</Otherwise>
					</Choose>
				</ModalBox>
			</ModalWrapper>
		</Portal>
	);
}

ConfirmationModal.propTypes = {
	message: PropTypes.string.isRequired,
	cancelButtonLabel: PropTypes.string,
	confirmButtonLabel: PropTypes.string,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	loadingMessage: PropTypes.string,
};

ConfirmationModal.defaultProps = {
	message: 'Are you sure you want proceed with this action?',
	cancelButtonLabel: 'Cancel',
	confirmButtonLabel: 'Confirm',
	loading: false,
	loadingMessage: 'Please wait...',
};

export default ConfirmationModal;
