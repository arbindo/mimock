import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ReactNotifications } from 'react-notifications-component';
import { FullPageLoader } from 'styles/Loaders';
import AppRoutes from './Routes';
import 'animate.css';
import 'react-notifications-component/dist/theme.css';
import './index.css';

const App = () => {
	return (
		<RecoilRoot>
			<FullPageLoader />
			<ReactNotifications />
			<AppRoutes />
		</RecoilRoot>
	);
};

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
