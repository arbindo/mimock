import React from 'react';
import ReactDOM from 'react-dom/client';
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

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
