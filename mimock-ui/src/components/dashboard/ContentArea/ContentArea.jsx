import React from 'react';
import List from './List';
import Sidebar from './Sidebar';
import { ContentAreaContainer } from './ContentArea.style';

function ContentArea() {
	return (
		<ContentAreaContainer>
			<Sidebar />
			<List />
		</ContentAreaContainer>
	);
}

export default ContentArea;
