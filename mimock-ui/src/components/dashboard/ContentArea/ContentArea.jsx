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
	sortColumn,
	sortDirection,
	handleOnClearFilterClick,
	handleOnBadgeClick,
	handleOnChangeSortSelector,
	handleOnClickSortDirection,
}) {
	// #region Defaults
	const isFilterCleared = httpMethodFilter === '';
	const isSortColumnCleared = sortColumn === '';
	const { testIds } = constants;
	// #endregion

	return (
		<ContentAreaContainer data-testid={testIds.contentAreaContainer}>
			<If condition={showSidebarSection}>
				<Sidebar
					handleOnBadgeClick={handleOnBadgeClick}
					isFilterCleared={isFilterCleared}
					isSortColumnCleared={isSortColumnCleared}
					handleOnChangeSortSelector={handleOnChangeSortSelector}
					handleOnClickSortDirection={handleOnClickSortDirection}
				/>
			</If>
			<List
				mocksListView={mocksListView}
				httpMethodFilter={httpMethodFilter}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				handleOnClearFilterClick={handleOnClearFilterClick}
			/>
		</ContentAreaContainer>
	);
}

ContentArea.propTypes = {
	showSidebarSection: PropTypes.bool.isRequired,
	mocksListView: PropTypes.string.isRequired,
	httpMethodFilter: PropTypes.string.isRequired,
	sortColumn: PropTypes.string.isRequired,
	sortDirection: PropTypes.string.isRequired,
	handleOnClearFilterClick: PropTypes.func.isRequired,
	handleOnBadgeClick: PropTypes.func.isRequired,
	handleOnChangeSortSelector: PropTypes.func.isRequired,
	handleOnClickSortDirection: PropTypes.func.isRequired,
};

export default ContentArea;
