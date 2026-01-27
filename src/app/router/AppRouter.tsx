import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getPublicUrl } from '@/shared/routing/urlHelpers';

import * as ROUTES from '@/app/router/routes';

import PageLayout from '@/app/layouts/PageLayout';

import NotFoundPage from '@/app/pages/Errors/NotFound';
import HomePage from '@/app/pages/Home';

const AppRouter: FC = () => (
	<BrowserRouter basename={getPublicUrl()}>
		<Routes>
			<Route
				path={ROUTES.HOME}
				element={<PageLayout />}
			>
				<Route
					index
					element={<HomePage />}
				/>
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Route>
		</Routes>
	</BrowserRouter>
);

export default AppRouter;
