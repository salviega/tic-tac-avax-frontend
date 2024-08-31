import { BrowserRouter, useRoutes } from 'react-router-dom'

import Layout from '@/components/Layout'

import Home from '../Home'

function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/',
			element: <Home />
		},
		{
			path: '/*',
			element: <Home />
		}
	])

	return routes
}

function App() {
	return (
		<>
			<BrowserRouter>
				<Layout appRoutes={<AppRoutes />} />
			</BrowserRouter>
		</>
	)
}

export default App
