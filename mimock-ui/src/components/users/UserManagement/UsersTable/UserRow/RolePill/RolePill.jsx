import React from 'react';
import { PropTypes } from 'prop-types';
import { Pill } from './RolePill.style';

export default function RolePill({ role }) {
	return (
		<Pill data-testid={`role-pill-${role}`} role={role}>
			{role}
		</Pill>
	);
}

RolePill.propTypes = {
	role: PropTypes.string.isRequired,
};
