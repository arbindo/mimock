import React from 'react';
import List from './List';
import Sidebar from './Sidebar';
import { ContentAreaContainer } from './ContentArea.style';
import PropTypes from 'prop-types';

function ContentArea({ showSidebarSection, mocksListView, handleClearFilter }) {
	return (
		<ContentAreaContainer>
			<If condition={showSidebarSection}>
				<Sidebar />
			</If>
			<List
				mocksListView={mocksListView}
				handleClearFilter={handleClearFilter}
			/>
		</ContentAreaContainer>
	);
}

ContentArea.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
	mocksListView: PropTypes.string.isRequired,
	handleClearFilter: PropTypes.func.isRequired,
};

export default ContentArea;
