import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './Routes';
import Toggle from './Toggle.jsx';

const App = () => {
	return (
		<>
			<Toggle />
			<AppRoutes />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
