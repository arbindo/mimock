import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
	ListContainer,
	ListTitle,
	ListClearFilter,
	ListClearFilterText,
	ListTitleSpan,
	MessageWrapper,
	MessageImageIcon,
	MessageSpan,
	LoaderStyle,
	WarningBanner,
	FilterTagsSection,
	FilterTagSpan,
} from './List.style.js';
import EmptyState from 'assets/empty-state.png';
import ErrorState from 'assets/server-down-state.png';
import { Cookies } from 'react-cookie';
import { constants } from './constants';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import { MdCancel, MdWarning } from 'react-icons/md';
import BarLoader from 'react-spinners/BarLoader';
import useLazyLoad from 'src/hooks/useLazyLoad';
import { useRecoilState } from 'recoil';
import pageNumberAtom from 'atoms/pageNumberAtom';
import {
	globalConstants,
	mockManagementConstants,
} from 'constants/globalConstants';
import MockCard from './MockCard';

function List({
	mocksListView,
	httpMethodFilter,
	sortColumn,
	sortDirection,
	expectedResponseType,
	handleOnClearFilterClick,
}) {
	// #region Defaults
	const cookies = new Cookies();
	const { label, testIds, errors, color } = constants;
	// #endregion

	// #region States
	const [filterTags, setFilterTags] = useState([]);
	const [showWarningBannerInBin, setShowWarningBannerInBin] = useState(false);
	// #endregion

	// #region Recoil States
	const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);
	// #endregion

	// #region Common Hooks
	const platformSettingsRef = useRef('');
	const { mocksList, listTitle, isFilter, loading, error, hasMore } =
		useLazyLoad(
			mocksListView,
			pageNumber,
			httpMethodFilter,
			sortColumn,
			sortDirection,
			expectedResponseType
		);
	useEffect(() => {
		setFilterTags(() => {
			// remove the default status tags for mocksListView and httpMethodFilter
			const statusTag =
				mocksListView !== 'ALL' ? `Status: ${mocksListView}` : '';
			const httpMethodTag =
				httpMethodFilter !== '' ? `Http Method: ${httpMethodFilter}` : '';
			const sortDirectionQueryParam =
				sortDirection !== '' ? `,${sortDirection}` : ',desc';
			const sortColumnWithDirectionTag =
				sortColumn !== ''
					? `Sort: ${sortColumn.toUpperCase()}${sortDirectionQueryParam.toUpperCase()}`
					: '';
			return [statusTag, httpMethodTag, sortColumnWithDirectionTag].filter(
				(item) => item !== ''
			);
		});
		if (mocksListView === mockManagementConstants.DELETED_STATUS) {
			platformSettingsRef.current = cookies.get(
				globalConstants.PLATFORM_SETTINGS_COOKIE_NAME
			);
			setShowWarningBannerInBin(
				platformSettingsRef.current.isFlushBinCronEnabled
			);
		} else {
			setShowWarningBannerInBin(false);
		}
	}, [mocksListView, httpMethodFilter, sortColumn, sortDirection]);
	const observer = useRef();
	const lastItem = useCallback(
		(node) => {
			// do NOT modify pageNumber when useLazyLoad hook isLoading data
			if (loading) {
				return;
			}

			// disconnect current observer (if current observer is valid)
			if (observer.current) {
				observer.current.disconnect();
			}

			// assign observer to IntersectionObserver if useLazyLoad hook has more data
			// and window scroll is intersecting with the last item in the list
			observer.current = new IntersectionObserver((items) => {
				if (items[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			// start observing the current node
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore]
	);
	// #endregion

	// #region Handler functions
	const handleOnClearFilterClickHandler = () => {
		setFilterTags([]);
		handleOnClearFilterClick();
	};
	// #endregion

	return (
		<ListContainer data-testid={testIds.listContainer}>
			<BarLoader
				data-testid={testIds.listMocksLoader}
				loading={loading}
				color={color.listMocksLoader}
				size={1000}
				css={LoaderStyle}
			/>
			<Choose>
				<When condition={error.status}>
					<MessageWrapper data-testid={testIds.listErrorContainer}>
						<MessageImageIcon
							data-testid={testIds.listErrorImage}
							src={ErrorState}
						/>
						<MessageSpan data-testid={testIds.listErrorMessage}>
							{error.message}
						</MessageSpan>
					</MessageWrapper>
				</When>
				<When condition={!error.status && !loading}>
					<ListTitleSpan>
						<If condition={isFilter}>
							<FaFilter data-testid={testIds.listFilterIcon} />
						</If>
						<ListTitle data-testid={testIds.listTitle}>{listTitle}</ListTitle>
						<If condition={isFilter}>
							<ListClearFilter data-testid={testIds.listClearFilter}>
								<MdCancel data-testid={testIds.listClearFilterIcon} />
								<ListClearFilterText
									data-testid={testIds.listClearFilterText}
									onClick={handleOnClearFilterClickHandler}
								>
									{label.clearFilter}
								</ListClearFilterText>
							</ListClearFilter>
						</If>
					</ListTitleSpan>
					<FilterTagsSection data-testid={testIds.filterTagsSection}>
						{filterTags.length > 0 && (
							<>
								<p>{label.filterTagsSection}</p>
								{filterTags.map((filterTag, index) => (
									<FilterTagSpan
										data-testid={`${testIds.filterTag}${index}`}
										key={`${filterTag}_tag_${index}`}
									>
										{filterTag}
									</FilterTagSpan>
								))}
							</>
						)}
					</FilterTagsSection>
					<Choose>
						<When condition={mocksList.length > 0}>
							{showWarningBannerInBin && (
								<WarningBanner data-testid={testIds.warningBanner}>
									{' '}
									<MdWarning /> {label.warningBanner}
								</WarningBanner>
							)}
							{mocksList.map((mock, index) => {
								if (mocksList.length === index + 1) {
									return (
										<MockCard
											innerRef={lastItem}
											key={mock.id}
											id={mock.id}
											dataTestId={`${testIds.mockCard}${mock.id}`}
											mockName={mock.mockName}
											description={mock.description}
											httpMethod={mock.httpMethod}
											route={mock.route}
										/>
									);
								} else {
									return (
										<MockCard
											key={mock.id}
											id={mock.id}
											dataTestId={`${testIds.mockCard}${mock.id}`}
											mockName={mock.mockName}
											description={mock.description}
											httpMethod={mock.httpMethod}
											route={mock.route}
										/>
									);
								}
							})}
						</When>
						<When condition={mocksList.length == 0}>
							<MessageWrapper data-testid={testIds.listEmptyContainer}>
								<MessageImageIcon
									data-testid={testIds.listEmptyImage}
									src={EmptyState}
								/>
								<MessageSpan data-testid={testIds.listEmptyMessage}>
									{errors.emptyState}
								</MessageSpan>
							</MessageWrapper>
						</When>
					</Choose>
				</When>
			</Choose>
		</ListContainer>
	);
}

List.propTypes = {
	mocksListView: PropTypes.string.isRequired,
	httpMethodFilter: PropTypes.string.isRequired,
	sortColumn: PropTypes.string.isRequired,
	sortDirection: PropTypes.string.isRequired,
	expectedResponseType: PropTypes.string.isRequired,
	handleOnClearFilterClick: PropTypes.func.isRequired,
};

export default List;
