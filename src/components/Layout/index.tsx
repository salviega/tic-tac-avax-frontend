import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'

export default function Layout({
	appRoutes
}: {
	appRoutes: ReactNode
}): JSX.Element {
	return (
		<>
			<Toaster />
			<Navbar />
			<div className='flex flex-col items-center my-3 px-8'>{appRoutes}</div>
			<Footer />
		</>
	)
}
