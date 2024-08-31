import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar(): JSX.Element {
	return (
		<nav className='flex flex-col items-center w-full h-32 py-5 px-8 z-10 border-b-2 box-border shadow-md text-sm font-light'>
			<ul className='flex justify-around items-center w-full '>
				<li>
					<ConnectButton />
				</li>
			</ul>
		</nav>
	)
}
