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
	expectedResponseType,
	importCompleted,
	handleOnClearFilterClick,
	handleOnBadgeClick,
	handleOnChangeSortSelector,
	handleOnClickSortDirection,
	handleOnChangeResponseTypeFilter,
	handleOnImportCompleted,
}) {
	// #region Defaults
	const isFilterCleared = httpMethodFilter === '';
	const isSortColumnCleared = sortColumn === '';
	const isExpectedResponseTypeCleared = expectedResponseType === '';
	const { testIds } = constants;
	// #endregion

	return (
		<ContentAreaContainer data-testid={testIds.contentAreaContainer}>
			<If condition={showSidebarSection}>
				<Sidebar
					handleOnBadgeClick={handleOnBadgeClick}
					isFilterCleared={isFilterCleared}
					isSortColumnCleared={isSortColumnCleared}
					isExpectedResponseTypeCleared={isExpectedResponseTypeCleared}
					handleOnChangeSortSelector={handleOnChangeSortSelector}
					handleOnClickSortDirection={handleOnClickSortDirection}
					handleOnChangeResponseTypeFilter={handleOnChangeResponseTypeFilter}
					handleOnImportCompleted={handleOnImportCompleted}
				/>
			</If>
			<List
				mocksListView={mocksListView}
				httpMethodFilter={httpMethodFilter}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				expectedResponseType={expectedResponseType}
				importCompleted={importCompleted}
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
	expectedResponseType: PropTypes.string.isRequired,
	importCompleted: PropTypes.bool.isRequired,
	handleOnClearFilterClick: PropTypes.func.isRequired,
	handleOnBadgeClick: PropTypes.func.isRequired,
	handleOnChangeSortSelector: PropTypes.func.isRequired,
	handleOnClickSortDirection: PropTypes.func.isRequired,
	handleOnChangeResponseTypeFilter: PropTypes.func.isRequired,
	handleOnImportCompleted: PropTypes.func.isRequired,
};

export default ContentArea;
