import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import {
	ModalWrapper,
	ModalBox,
	ModalMessage,
	CancelButton,
	ConfirmButton,
} from './ConfirmationModal.style';

function ConfirmationModal({
	message,
	cancelButtonLabel,
	confirmButtonLabel,
	onConfirm,
	onCancel,
}) {
	return (
		<Portal node={document && document.getElementById('app')}>
			<ModalWrapper data-testid='confirmation-modal'>
				<ModalBox>
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
};

ConfirmationModal.defaultProps = {
	message: 'Are you sure you want proceed with this action?',
	cancelButtonLabel: 'Cancel',
	confirmButtonLabel: 'Confirm',
};

export default ConfirmationModal;
