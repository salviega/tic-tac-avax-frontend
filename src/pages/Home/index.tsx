import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

// import BackgroundAudio from '@/components/BackGroundSound';
import FormPlayers from '@/components/FormPlayers'
import NotAccount from '@/components/shared/NotAccount'
import CyberpunkBentoTicTacToe from '@/components/TicTacToe'
import { chains } from '@/enums/chains.enum'
import { getContracts } from '@/helpers/contracts'

import Loading from '../../components/shared/Loading/index'

export default function Home(): JSX.Element {
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isStartGame, setIsStartGame] = useState<boolean>(false)
	const { address, isConnected, chainId } = useAccount()

	if (chainId === undefined) {
		return <Loading />
	}

	const getChainEnum = (): chains | undefined => {
		switch (chainId) {
			case 421614:
				return chains.ARBITRUM_SEPOLIA
			case 43113:
				return chains.AVALANCHE_FUJI
			case 84532:
				return chains.BASE_SEPOLIA
			case 44787:
				return chains.CELO_ALFAJORES
			default:
				return undefined
		}
	}

	const { ticTacAvax } = getContracts(getChainEnum() as chains)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (address) {
			;(async () => {
				const isGameOver = await ticTacAvax.gameOver()
				setIsGameOver(isGameOver)
				setIsLoading(false)
			})()
		}
	}, [address])

	const startGame = () => {
		setIsStartGame(true)
	}

	return (
		<div className='flex justify-center items-center flex-col min-h-lvh'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<p className='text-white font-bold'>{`It's ${isGameOver ? 'Game Over' : 'Your Turn'}`}</p>
					{isConnected ? (
						<div className=''>
							{!isStartGame ? (
								<FormPlayers startGame={startGame} />
							) : (
								<CyberpunkBentoTicTacToe />
							)}
						</div>
					) : (
						<NotAccount />
					)}
					{/* <BackgroundAudio audioSrc='src/assets/sounds/menuSound.mp3' /> */}
					{/* <h1 className='text-white font-bold'>CyberpunkBentoTicTacToe</h1> */}

					{/* <CyberpunkBentoTicTacToe /> */}
				</>
			)}
		</div>
	)
}
