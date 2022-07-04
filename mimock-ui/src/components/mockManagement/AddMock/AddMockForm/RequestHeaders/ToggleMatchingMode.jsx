import React from 'react';
import Switch from '@mui/material/Switch';
import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
import {
	ToggleModeWrapper,
	SwitchWrapper,
	SwitchLabel,
	HintWrapper,
	Hint,
	HintIcon,
} from './RequestHeaders.style';
import { useRecoilState } from 'recoil';
import newMockFieldsAtom from 'atoms/newMockFieldsAtom';

export default function ToggleMatchingMode() {
	const iosStyles = useIosSwitchStyles();
	const { root, switchBase, checked, thumb, track } = iosStyles;

	const [mockData, setMockData] = useRecoilState(newMockFieldsAtom);

	return (
		<ToggleModeWrapper>
			<SwitchWrapper>
				<Switch
					data-testid='header-matching-switch'
					classes={{ root, switchBase, checked, thumb, track }}
					checked={mockData.shouldDoExactHeaderMatching}
					onChange={(e) => {
						setMockData({
							...mockData,
							shouldDoExactHeaderMatching: e.target.checked,
						});
					}}
				/>
				<SwitchLabel>
					{mockData.shouldDoExactHeaderMatching
						? 'Exact Matching'
						: 'Partial Matching'}
				</SwitchLabel>
			</SwitchWrapper>
			<HintWrapper>
				<HintIcon />
				<Hint>
					{mockData.shouldDoExactHeaderMatching
						? 'Expects all headers to match exactly when sending a request to the mocked endpoint. Do not use this if your client could send additional request headers'
						: 'Performs a loose comparison and validates only the custom headers configured below while sending a request to the mocked endpoint. Other headers sent in the request will be ignored'}
				</Hint>
			</HintWrapper>
		</ToggleModeWrapper>
	);
}
