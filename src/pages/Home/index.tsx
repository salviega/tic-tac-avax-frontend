import { useEffect, useState } from 'react'
import { ZeroAddress } from 'ethers'
import { useAccount } from 'wagmi'

// import BackgroundAudio from '@/components/BackGroundSound';
import FormPlayers from '@/components/FormPlayers'
import NotAccount from '@/components/shared/NotAccount'
import CyberpunkBentoTicTacToe from '@/components/TicTacToe'
import { GAS_LIMIT, GAS_VALUE } from '@/config/commons'
import { chains } from '@/enums/chains.enum'
import {
	convertBoardToSerializable,
	getFrontendSigner,
	timestampToFormatedDate
} from '@/helpers'
import { getContracts } from '@/helpers/contracts'

import Loading from '../../components/shared/Loading/index'

export default function Home(): JSX.Element {
	const [currentPlayer, setCurrentPlayer] = useState<string>(ZeroAddress)
	const [gameCount, setGameCount] = useState<number>(0)
	const [isGameOver, setIsGameOver] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isStartGame, setIsStartGame] = useState<boolean>(false)
	const [lastMoveTimestamp, setLastMoveTimestamp] = useState<string>('')
	const [lastWinner, setLastWinner] = useState<string>(ZeroAddress)
	const [playerOne, setPlayerTwo] = useState<string>(ZeroAddress)
	const [playerTwo, setPlayerOne] = useState<string>(ZeroAddress)
	const [roundCount, setRoundCount] = useState<number>(0)
	const [winner, setWinner] = useState<string>(ZeroAddress)
	const { address, isConnected } = useAccount()

	const [currentPositionPlayer, setCurrentPositionPlayer] = useState<number>(0)

	const { ticTacAvax } = getContracts(chains.AVALANCHE_FUJI)

	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	])

	const fetchData = async () => {
		// get game status
		setIsGameOver(await ticTacAvax.gameOver())

		// get current player
		const positionPlayer: number = Number(await ticTacAvax.currentPlayer())
		setCurrentPlayer(await ticTacAvax.players(positionPlayer))

		// get players
		setPlayerOne(await ticTacAvax.players(0))
		setPlayerTwo(await ticTacAvax.players(1))

		// get board
		setBoard(convertBoardToSerializable(await ticTacAvax.getBoard()))

		// get round count
		setRoundCount(Number(await ticTacAvax.roundCount()))

		// get last move time
		const currentLastMove: string = timestampToFormatedDate(
			await ticTacAvax.lastMoveTimestamp()
		)

		setLastMoveTimestamp(currentLastMove)

		// get current winner
		setWinner(await ticTacAvax.winner())

		// get last winner
		setLastWinner(await ticTacAvax.lastRoundWinner())

		// get game count
		setGameCount(Number(await ticTacAvax.gameCount()))

		setIsLoading(false)
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (address) {
			fetchData()
		}
	}, [address])

	const onStartGame = async (playerOne: string, playerTwo: string) => {
		try {
			setIsLoading(true)

			const web3Signer = await getFrontendSigner()

			const startGameTx = await ticTacAvax
				.connect(web3Signer)
				.startGame(playerOne, playerTwo, {
					gasLimit: GAS_LIMIT
				})
			await startGameTx.wait()
		} catch (error) {
			console.error(error)
			// TODO: toast error
		} finally {
			fetchData()
		}
	}

	const onMakeMove = async (row: number, column: number) => {
		try {
			if (!address) {
				return
			}

			setIsLoading(true)

			const lowerCaseAddress = address.toLowerCase()
			const lowerCaseCurrentPlayer = currentPlayer.toLowerCase()

			if (lowerCaseAddress !== lowerCaseCurrentPlayer) {
				// TODO: toast error
				return
			}

			const web3Signer = await getFrontendSigner()

			const makeMoveTx = await ticTacAvax
				.connect(web3Signer)
				.makeMove(row, column, {
					gasLimit: GAS_LIMIT
				})
			await makeMoveTx.wait()
		} catch (error) {
			console.error(error)
			// TODO: toast error
		} finally {
			fetchData()
		}
	}

	const resetBoard = () => {
		setBoard([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		])
	}

	return (
		<div className='flex justify-center items-center flex-col min-h-lvh'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className=''>
						{isConnected && !isGameOver ? (
							<CyberpunkBentoTicTacToe
								board={board}
								setBoard={setBoard}
								resetBoard={resetBoard}
								currentRoundCount={gameCount}
								players={[playerOne, playerTwo]}
								winnerContract={winner}
								sendMovent={onMakeMove}
							/>
						) : (
							<FormPlayers startGame={onStartGame} />
						)}
					</div>

					{/* <BackgroundAudio audioSrc='src/assets/sounds/menuSound.mp3' /> */}
					{/* <h1 className='text-white font-bold'>CyberpunkBentoTicTacToe</h1> */}

					{/* <CyberpunkBentoTicTacToe /> */}
				</>
			)}
		</div>
	)
}
