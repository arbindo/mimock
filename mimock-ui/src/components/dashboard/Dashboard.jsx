import React from 'react';
import ContentArea from './ContentArea';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

export default function Dashboard() {
	return (
		<>
			<Titlebar />
			<Toolbar />
			<ContentArea />
		</>
	);
}
