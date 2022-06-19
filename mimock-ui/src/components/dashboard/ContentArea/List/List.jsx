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

function List({ mocksListView, httpMethodFilter, handleOnClearFilterClick }) {
	// #region Defaults
	const cookies = new Cookies();
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
		useLazyLoad(mocksListView, pageNumber, httpMethodFilter);
	useEffect(() => {
		setFilterTags(() => {
			// remove the default status tags for mocksListView and httpMethodFilter
			const statusTag =
				mocksListView !== 'ALL' ? `Status: ${mocksListView}` : '';
			const httpMethodTag =
				httpMethodFilter !== '' ? `Http Method: ${httpMethodFilter}` : '';
			return [statusTag, httpMethodTag].filter((item) => item !== '');
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
	}, [mocksListView, httpMethodFilter]);
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
		<ListContainer data-testid={constants.testIds.listContainer}>
			<BarLoader
				data-testid={constants.testIds.listMocksLoader}
				loading={loading}
				color={constants.color.listMocksLoader}
				size={1000}
				css={LoaderStyle}
			/>
			<Choose>
				<When condition={error.status}>
					<MessageWrapper data-testid={constants.testIds.listErrorContainer}>
						<MessageImageIcon
							data-testid={constants.testIds.listErrorImage}
							src={ErrorState}
						/>
						<MessageSpan data-testid={constants.testIds.listErrorMessage}>
							{error.message}
						</MessageSpan>
					</MessageWrapper>
				</When>
				<When condition={!error.status && !loading}>
					<ListTitleSpan>
						<If condition={isFilter}>
							<FaFilter data-testid={constants.testIds.listFilterIcon} />
						</If>
						<ListTitle data-testid={constants.testIds.listTitle}>
							{listTitle}
						</ListTitle>
						<If condition={isFilter}>
							<ListClearFilter data-testid={constants.testIds.listClearFilter}>
								<MdCancel data-testid={constants.testIds.listClearFilterIcon} />
								<ListClearFilterText
									data-testid={constants.testIds.listClearFilterText}
									onClick={handleOnClearFilterClickHandler}
								>
									{constants.label.clearFilter}
								</ListClearFilterText>
							</ListClearFilter>
						</If>
					</ListTitleSpan>
					<FilterTagsSection data-testid={constants.testIds.filterTagsSection}>
						{filterTags.length > 0 && (
							<>
								<p>{constants.label.filterTagsSection}</p>
								{filterTags.map((filterTag, index) => (
									<FilterTagSpan
										data-testid={`${constants.testIds.filterTag}${index}`}
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
								<WarningBanner data-testid={constants.testIds.warningBanner}>
									{' '}
									<MdWarning /> {constants.label.warningBanner}
								</WarningBanner>
							)}
							{mocksList.map((mock, index) => {
								if (mocksList.length === index + 1) {
									return (
										<MockCard
											innerRef={lastItem}
											key={mock.id}
											id={mock.id}
											dataTestId={`${constants.testIds.mockCard}${mock.id}`}
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
											dataTestId={`${constants.testIds.mockCard}${mock.id}`}
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
							<MessageWrapper
								data-testid={constants.testIds.listEmptyContainer}
							>
								<MessageImageIcon
									data-testid={constants.testIds.listEmptyImage}
									src={EmptyState}
								/>
								<MessageSpan data-testid={constants.testIds.listEmptyMessage}>
									{constants.errors.emptyState}
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
	handleOnClearFilterClick: PropTypes.func.isRequired,
};

export default List;
