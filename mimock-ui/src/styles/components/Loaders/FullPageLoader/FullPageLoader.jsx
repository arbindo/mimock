import React from 'react';
import { useRecoilState } from 'recoil';
import { Portal } from 'react-portal';
import SyncLoader from 'react-spinners/SyncLoader';
import showFullPageLoader from 'atoms/showFullPageLoader';
import { LoaderWrapper, LoaderStyle } from './FullPageLoader.style';

function FullPageLoader() {
	const [loading] = useRecoilState(showFullPageLoader);

	return (
		<If condition={loading}>
			<Portal node={document && document.getElementById('app')}>
				<LoaderWrapper data-testid='fullpage-loader'>
					<SyncLoader
						loading={loading}
						color='teal'
						size={30}
						css={LoaderStyle}
					/>
				</LoaderWrapper>
			</Portal>
		</If>
	);
}

export default FullPageLoader;
