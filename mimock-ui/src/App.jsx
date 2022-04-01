import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import AppRoutes from './Routes';

const App = () => {
	return (
		<RecoilRoot>
			<AppRoutes />
		</RecoilRoot>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
