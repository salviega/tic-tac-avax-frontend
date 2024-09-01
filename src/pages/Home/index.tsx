import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

// import BackgroundAudio from '@/components/BackGroundSound';
import FormPlayers from '@/components/FormPlayers'
import NotAccount from '@/components/shared/NotAccount'
import CyberpunkBentoTicTacToe from '@/components/TicTacToe'
import { chains } from '@/enums/chains.enum'
import { convertBoardToSerializable, timestampToFormatedDate } from '@/helpers'
import { getContracts } from '@/helpers/contracts'
import { BoardContract } from '@/models/board-contract.model'

import Loading from '../../components/shared/Loading/index'

export default function Home(): JSX.Element {
	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const [playerOne, setPlayerTwo] = useState<string>('')

	const [playerTwo, setPlayerOne] = useState<string>('')

	const [connectedCurrentPositionPlayer, setConnectedCurrentPositionPlayer] =
		useState<number>(0)

	const [otherChainCurrentPositionPlayer, setOtherChainCurrentPositionPlayer] =
		useState<number>(0)

	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	])

	const [roundCount, setRoundCount] = useState<number>(0)

	const [lastMoveTimestamp, setLastMoveTimestamp] = useState<string>('')

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
	const chainEnum: chains | undefined = getChainEnum()

	const { ticTacAvaxCross: connectedTicTacAvax } = getContracts(chainEnum as chains)

	const { ticTacAvaxCross: otherChainTicTacAvax } = getContracts(
		(chainEnum as chains) === chains.CELO_ALFAJORES
			? chains.BASE_SEPOLIA
			: chains.CELO_ALFAJORES
	)

	const fetchData = async () => {
		const connectedIsGameOver = await connectedTicTacAvax.gameOver()
		setIsGameOver(connectedIsGameOver)

		const currentConnectedCurrentPositionPlayer: bigint =
			await otherChainTicTacAvax.currentPlayer()

		setConnectedCurrentPositionPlayer(
			Number(currentConnectedCurrentPositionPlayer)
		)

		setPlayerOne(
			await connectedTicTacAvax.players(currentConnectedCurrentPositionPlayer)
		)

		const currentOtherChainCurrentPositionPlayer: bigint =
			await connectedTicTacAvax.currentPlayer()

		setPlayerTwo(
			await connectedTicTacAvax.players(currentOtherChainCurrentPositionPlayer)
		)

		setOtherChainCurrentPositionPlayer(
			Number(currentOtherChainCurrentPositionPlayer)
		)

		const currentConnectedBoard: [
			[bigint, bigint, bigint],
			[bigint, bigint, bigint],
			[bigint, bigint, bigint]
		] = await connectedTicTacAvax.getBoard()
		console.log('currentConnectedBoard', currentConnectedBoard)

		setBoard(convertBoardToSerializable(currentConnectedBoard))

		const currentRoundCount: bigint = await connectedTicTacAvax.roundCount()
		setRoundCount(Number(currentRoundCount))

		const currentLastMoveTimestamp: bigint =
			await connectedTicTacAvax.lastMoveTimestamp()

		const formatedCurrentLastMoveTimestamp: string = timestampToFormatedDate(
			currentLastMoveTimestamp
		)

		setLastMoveTimestamp(formatedCurrentLastMoveTimestamp)
		setIsLoading(false)
		console.log('currentConnectedCurrentPositionPlayer', currentConnectedCurrentPositionPlayer)
		console.log('currentOtherChainCurrentPositionPlayer', currentOtherChainCurrentPositionPlayer)
		console.log('currentConnectedBoard', convertBoardToSerializable(currentConnectedBoard))
		console.log('currentRoundCount', currentRoundCount)
		console.log('currentLastMoveTimestamp', currentLastMoveTimestamp)

	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (address) {
			fetchData()
		}
	}, [address])

	const startGame = () => {
		setIsStartGame(true)
	}
	const resetBoard = () => {
		setBoard([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]);
	};

	return (
		<div className='flex justify-center items-center flex-col min-h-lvh'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{isConnected ? (
						<div className=''>
							{!isStartGame ? (
								<FormPlayers startGame={startGame} />
							) : (
								<CyberpunkBentoTicTacToe
									board={board}
									setBoard={setBoard}
									resetBoard={resetBoard}
								/>
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
