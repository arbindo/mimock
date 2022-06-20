import React from 'react';
import { ContentAreaContainer } from './ContentArea.style';
import { constants } from './constants';
import PropTypes from 'prop-types';
import List from './List';
import Sidebar from './Sidebar';

function ContentArea({
	showSidebarSection,
	mocksListView,
	httpMethodFilter,
	handleOnClearFilterClick,
	handleOnBadgeClick,
}) {
	// #region Defaults
	const isFilterCleared = httpMethodFilter === '';
	// #endregion

	return (
		<ContentAreaContainer data-testid={constants.testIds.contentAreaContainer}>
			<If condition={showSidebarSection}>
				<Sidebar
					handleOnBadgeClick={handleOnBadgeClick}
					isFilterCleared={isFilterCleared}
				/>
			</If>
			<List
				mocksListView={mocksListView}
				httpMethodFilter={httpMethodFilter}
				handleOnClearFilterClick={handleOnClearFilterClick}
			/>
		</ContentAreaContainer>
	);
}

ContentArea.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
	mocksListView: PropTypes.string.isRequired,
	httpMethodFilter: PropTypes.string.isRequired,
	handleOnClearFilterClick: PropTypes.func.isRequired,
	handleOnBadgeClick: PropTypes.func.isRequired,
};

export default ContentArea;
