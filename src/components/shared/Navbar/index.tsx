import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar(): JSX.Element {
	return (
		<nav
			className="top-0 sticky flex flex-col items-center w-full h-32 py-5 px-8 z-10 shadow-md text-sm font-light backdrop-blur bg-[#37005B]/50 box-border md:flex-row md:justify-between md:h-20"
			aria-label="Main Navigation"
		>
			<div className="flex items-center justify-center w-full md:w-auto">
				<img src="images/TicTacToe-Avax.png" alt="Logo TicTacToe" className='w-[200px]' />
			</div>
			<ul className="flex flex-col justify-around items-center w-full md:flex-row md:w-auto space-y-4 md:space-y-0 md:space-x-8" role="menu">
				<li role="menuitem">

					<ConnectButton accountStatus={'full'} chainStatus="name" showBalance />
				</li>
			</ul>
		</nav>

	)
}
