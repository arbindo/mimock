import React from 'react';
import PropTypes from 'prop-types';
import { IconHeaderWrapper, Title } from './IconHeader.style';

function IconHeader({ icon, dataTestId, title }) {
	return (
		<IconHeaderWrapper data-testid={dataTestId}>
			{icon}
			<Title>{title}</Title>
		</IconHeaderWrapper>
	);
}

IconHeader.propTypes = {
	icon: PropTypes.element.isRequired,
	dataTestId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default IconHeader;
