import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';

function Wrapper({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

Wrapper.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Wrapper;
