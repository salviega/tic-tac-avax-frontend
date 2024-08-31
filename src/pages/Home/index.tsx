import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

// import BackgroundAudio from '@/components/BackGroundSound';
import FormPlayers from '@/components/FormPlayers';
import NotAccount from '@/components/shared/NotAccount';
import CyberpunkBentoTicTacToe from '@/components/TicTacToe';

import Loading from '../../components/shared/Loading/index';

export default function Home(): JSX.Element {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isStartGame, setIsStartGame] = useState<boolean>(false);
	const { isConnected } = useAccount();
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	const startGame = () => {
		setIsStartGame(true);
	}

	return (
		<div className='flex justify-center items-center flex-col min-h-lvh'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{
						isConnected ? <div className="">

							{!isStartGame ? <FormPlayers startGame={startGame} /> : <CyberpunkBentoTicTacToe />}

						</div>
							:

							<NotAccount />
					}
					{/* <BackgroundAudio audioSrc='src/assets/sounds/menuSound.mp3' /> */}
					{/* <h1 className='text-white font-bold'>CyberpunkBentoTicTacToe</h1> */}

					{/* <CyberpunkBentoTicTacToe /> */}
				</>
			)}
		</div>
	);
}
