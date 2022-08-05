import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ErrorAlert({ title, subTitle, message, dataTestId }) {
	return (
		<Alert
			data-testid={dataTestId}
			severity='error'
			style={{
				marginTop: '2rem',
				width: '90%',
				marginLeft: 'auto',
				marginRight: 'auto',
				padding: '1rem',
			}}
		>
			<AlertTitle>{title}</AlertTitle>
			<strong>{subTitle}</strong>
			<If condition={message && message.length}>
				<span> - </span>
				<span>{message}</span>
			</If>
		</Alert>
	);
}

ErrorAlert.propTypes = {
	title: PropTypes.string.isRequired,
	subTitle: PropTypes.string.isRequired,
	message: PropTypes.string,
	dataTestId: PropTypes.string.isRequired,
};

ErrorAlert.defaultProps = {
	message: '',
};

export default ErrorAlert;
