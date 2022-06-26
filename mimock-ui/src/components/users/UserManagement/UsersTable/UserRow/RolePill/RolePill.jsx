import React from 'react';
import { PropTypes } from 'prop-types';
import { Pill } from './RolePill.style';

export default function RolePill({ role, margin }) {
	return (
		<Pill data-testid={`role-pill-${role}`} role={role} $margin={margin}>
			{role}
		</Pill>
	);
}

RolePill.propTypes = {
	role: PropTypes.string.isRequired,
	margin: PropTypes.string,
};
