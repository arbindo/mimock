import React from 'react';
import List from './List';
import Sidebar from './Sidebar';
import Titlebar from './Titlebar';
import Toolbar from './Toolbar';

export default function Dashboard() {
	return (
		<>
			<Titlebar />
			<Toolbar />
			<Sidebar />
			<List />
		</>
	);
}
