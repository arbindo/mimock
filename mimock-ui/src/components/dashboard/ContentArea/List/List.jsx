import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { constants } from './constants';
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
import MockCard from './MockCard';
import EmptyState from 'assets/empty-state.png';
import ErrorState from 'assets/server-down-state.png';
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

function List({ mocksListView, httpMethodFilter, handleClearFilter }) {
	const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);
	const [filterTags, setFilterTags] = useState([]);
	const [showWarningBannerInBin, setShowWarningBannerInBin] = useState(false);
	const cookies = new Cookies();
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

	const handleClearFilterHandler = () => {
		setFilterTags([]);
		handleClearFilter();
	};

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

	return (
		<ListContainer data-testid='list-section'>
			<BarLoader
				data-testid='list-mocks-loader'
				loading={loading}
				color='teal'
				size={1000}
				css={LoaderStyle}
			/>
			<Choose>
				<When condition={error.status}>
					<MessageWrapper>
						<MessageImageIcon src={ErrorState} />
						<MessageSpan>{error.message}</MessageSpan>
					</MessageWrapper>
				</When>
				<When condition={!error.status && !loading}>
					<ListTitleSpan>
						<If condition={isFilter}>
							<FaFilter />
						</If>
						<ListTitle>{listTitle}</ListTitle>
						<If condition={isFilter}>
							<ListClearFilter>
								<MdCancel />
								<ListClearFilterText onClick={handleClearFilterHandler}>
									{constants.label.clearFilter}
								</ListClearFilterText>
							</ListClearFilter>
						</If>
					</ListTitleSpan>
					<FilterTagsSection>
						{filterTags.length > 0 && (
							<>
								<p>Filters Applied: </p>
								{filterTags.map((filterTag, index) => (
									<FilterTagSpan key={`${filterTag}_tag_${index}`}>
										{filterTag}
									</FilterTagSpan>
								))}
							</>
						)}
					</FilterTagsSection>
					<Choose>
						<When condition={mocksList.length > 0}>
							{showWarningBannerInBin && (
								<WarningBanner>
									{' '}
									<MdWarning /> Items in bin are deleted forever after 30 days!
								</WarningBanner>
							)}
							{mocksList.map((mock, index) => {
								if (mocksList.length === index + 1) {
									return (
										<MockCard
											innerRef={lastItem}
											key={mock.id}
											id={mock.id}
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
							<MessageWrapper>
								<MessageImageIcon src={EmptyState} />
								<MessageSpan>{constants.errors.emptyState}</MessageSpan>
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
	handleClearFilter: PropTypes.func.isRequired,
};

export default List;
