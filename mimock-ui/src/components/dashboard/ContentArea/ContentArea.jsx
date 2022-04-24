import React from 'react';
import List from './List';
import Sidebar from './Sidebar';
import { ContentAreaContainer } from './ContentArea.style';
import PropTypes from 'prop-types';

function ContentArea({ showSidebarSection }) {
	return (
		<ContentAreaContainer>
			<If condition={showSidebarSection}>
				<Sidebar />
			</If>
			<List showSidebarSection={showSidebarSection} />
		</ContentAreaContainer>
	);
}

ContentArea.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
};

export default ContentArea;
