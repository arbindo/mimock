import React from 'react';
import {
	SideBarContainer,
	SidebarBox,
	TitleSpan,
	SpanText,
	SelectComponent,
	SelectOptionComponent,
	FormCheckWrapper,
	RadioComponent,
	RadioOptionText,
	BadgeFilter,
	ComponentLabel,
	ComponentWrapper,
	RowComponentWrapper,
} from './Sidebar.style.js';
import { constants } from './constants';
import { FaCogs } from 'react-icons/fa';

function Sidebar() {
	const handleOnchange = (e) => {
		console.log(e);
	};

	return (
		<SideBarContainer data-testid='sidebar-section'>
			<SidebarBox>
				<TitleSpan>
					<FaCogs /> <SpanText>{constants.title}</SpanText>
				</TitleSpan>
				<ComponentWrapper>
					<ComponentLabel>{constants.label.badgefilter}</ComponentLabel>
					<RowComponentWrapper>
						{constants.badgeFilterItems.map((item, key) => (
							<BadgeFilter
								data-testid='card-badge'
								key={key}
								className={item.badgeColor}
							>
								{item.httpMethod}
							</BadgeFilter>
						))}
					</RowComponentWrapper>
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel>{constants.label.radiogroup}</ComponentLabel>
					{constants.radioGroupItems.map((item, key) => (
						<FormCheckWrapper key={key}>
							<RadioComponent
								type='radio'
								value=''
								onChange={handleOnchange}
								name='response-type'
								id={`response-type-${key}`}
							></RadioComponent>
							<RadioOptionText htmlFor={`response-type-${key}`}>
								{item}
							</RadioOptionText>
						</FormCheckWrapper>
					))}
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel htmlFor='sort-element'>
						{constants.label.sort}
					</ComponentLabel>
					<SelectComponent
						id='sort-element'
						data-testid='sort-element'
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{constants.sortItems.map((item, key) => (
							<SelectOptionComponent key={key}>{item}</SelectOptionComponent>
						))}
					</SelectComponent>
				</ComponentWrapper>
				<ComponentWrapper>
					<ComponentLabel htmlFor='group-element'>
						{constants.label.group}
					</ComponentLabel>
					<SelectComponent
						id='group-element'
						data-testid='group-element'
						defaultValue=''
					>
						<SelectOptionComponent value='' disabled hidden>
							Choose...
						</SelectOptionComponent>
						{constants.groupItems.map((item, key) => (
							<SelectOptionComponent key={key}>{item}</SelectOptionComponent>
						))}
					</SelectComponent>
				</ComponentWrapper>
			</SidebarBox>
		</SideBarContainer>
	);
}

export default Sidebar;
