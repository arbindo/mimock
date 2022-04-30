import React from 'react';
import { PropTypes } from 'prop-types';
import {
	Indicator,
	GreenBlob,
	RedBlob,
	StatusLabel,
	ActivationStatusWrapper,
} from './ActivationStatus.style';

function ActivationStatus({ status }) {
	const statusIndicator = () => {
		if (status) {
			return <GreenBlob />;
		}

		return <RedBlob />;
	};
	const statusLabel = status ? 'Active' : 'Inactive';

	return (
		<ActivationStatusWrapper data-testid='user-activation-status'>
			<Indicator data-testid={`status-indicator-${status}`}>
				{statusIndicator()}
			</Indicator>
			<StatusLabel data-testid={`status-label-${status}`}>
				{statusLabel}
			</StatusLabel>
		</ActivationStatusWrapper>
	);
}

ActivationStatus.propTypes = {
	status: PropTypes.bool.isRequired,
};

export default ActivationStatus;
