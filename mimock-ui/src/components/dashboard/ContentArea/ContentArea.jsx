import React from 'react';
import List from './List';
import Sidebar from './Sidebar';
import { ContentAreaContainer } from './ContentArea.style';
import PropTypes from 'prop-types';

function ContentArea({
	showSidebarSection,
	mocksListView,
	httpMethodFilter,
	handleClearFilter,
	handleOnBadgeClick,
}) {
	return (
		<ContentAreaContainer>
			<If condition={showSidebarSection}>
				<Sidebar
					onBadgeClick={handleOnBadgeClick}
					isFilterCleared={httpMethodFilter === ''}
				/>
			</If>
			<List
				mocksListView={mocksListView}
				httpMethodFilter={httpMethodFilter}
				handleClearFilter={handleClearFilter}
			/>
		</ContentAreaContainer>
	);
}

ContentArea.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
	mocksListView: PropTypes.string.isRequired,
	httpMethodFilter: PropTypes.string.isRequired,
	handleClearFilter: PropTypes.func.isRequired,
	handleOnBadgeClick: PropTypes.func.isRequired,
};

export default ContentArea;
