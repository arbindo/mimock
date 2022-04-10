import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from 'components/login';
import useAxiosInterceptor from 'api/useAxiosInterceptor';
import GuardedRoute from './GuardedRoute';
import { FullPageLoader } from './styles/components/Loaders';

function AppRoutes() {
	useAxiosInterceptor();

	return (
		<Router basename='/'>
			<Routes>
				<Route path='' exact element={<Navigate to='/mimock-ui' />} />
				<Route path='/mimock-ui'>
					<Route path='' exact element={<Login />} />
					<Route
						path=''
						element={
							<Suspense fallback={<FullPageLoader />}>
								<GuardedRoute />
							</Suspense>
						}
					>
						<Route path='/mimock-ui/mocks' element={<h1> mocks </h1>} />
						<Route path='/mimock-ui/users' element={<h1> users </h1>} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRoutes;
