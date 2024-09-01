import { useEffect, useState } from 'react'
import { AddressLike, ZeroAddress } from 'ethers'
import { useAccount } from 'wagmi'

// import BackgroundAudio from '@/components/BackGroundSound';
import FormPlayers from '@/components/FormPlayers'
import NotAccount from '@/components/shared/NotAccount'
import CyberpunkBentoTicTacToe from '@/components/TicTacToe'
import {
	chainTicTacAvaxAddress,
	chainTicTacAvaxCrossAddress
} from '@/enums/chain-contracts-addresses.enum'
import { chainNames } from '@/enums/chain-names.enum'
import { chainValues } from '@/enums/chain-values.enum'
import { chains } from '@/enums/chains.enum'
import { convertBoardToSerializable, timestampToFormatedDate } from '@/helpers'
import { getContracts } from '@/helpers/contracts'

import Loading from '../../components/shared/Loading/index'

export default function Home(): JSX.Element {
	const [isGameOver, setIsGameOver] = useState<boolean>(false)

	const [playerOne, setPlayerTwo] = useState<string>(ZeroAddress)

	const [playerTwo, setPlayerOne] = useState<string>(ZeroAddress)

	const [connectedCurrentPositionPlayer, setConnectedCurrentPositionPlayer] =
		useState<number>(0)

	const [otherChainCurrentPositionPlayer, setOtherChainCurrentPositionPlayer] =
		useState<number>(0)

	const [board, setBoard] = useState<number[][]>([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	])

	const [winner, setWinner] = useState<string>(ZeroAddress)

	const [roundCount, setRoundCount] = useState<number>(0)

	const [lastWinner, setLastWinner] = useState<string>(ZeroAddress)

	const [lastMoveTimestamp, setLastMoveTimestamp] = useState<string>('')

	const [gameCount, setGameCount] = useState<number>(0)

	const [destinationChain, setDestinationChain] = useState<
		chainNames | undefined
	>(undefined)

	const [destinationAddress, setDestinationAddress] = useState<
		string | undefined
	>(undefined)

	const [chainValue, setChainValue] = useState<number>(0)

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isStartGame, setIsStartGame] = useState<boolean>(false)
	const { address, isConnected, chainId } = useAccount()

	if (chainId === undefined) {
		return <Loading />
	}

	const getChainEnum = (): chains | undefined => {
		switch (chainId) {
			case 43113:
				return chains.AVALANCHE_FUJI
			case 44787:
				return chains.CELO_ALFAJORES
			default:
				return undefined
		}
	}

	const chainEnum: chains | undefined = getChainEnum()

	const { ticTacAvaxCross: connectedTicTacAvax } = getContracts(
		chainEnum as chains
	)

	const { ticTacAvaxCross: otherChainTicTacAvax } = getContracts(
		(chainEnum as chains) === chains.CELO_ALFAJORES
			? chains.AVALANCHE_FUJI
			: chains.CELO_ALFAJORES
	)

	function getDestinationChain(chainName: chainNames): chainNames {
		switch (chainName) {
			case chainNames.AVALANCHE_FUJI:
				return chainNames.AVALANCHE_FUJI
			case chainNames.CELO_ALFAJORES:
				return chainNames.CELO_ALFAJORES
			default:
				return chainNames.DEFAULT
		}
	}

	function getDestinationTicTacAvaxAddress(
		ticTacAvaxAddress: chainTicTacAvaxAddress
	): string | undefined {
		switch (ticTacAvaxAddress) {
			case chainTicTacAvaxAddress.AVALANCHE_FUJI:
				return chainTicTacAvaxAddress.AVALANCHE_FUJI
			case chainTicTacAvaxAddress.CELO_ALFAJORES:
				return chainTicTacAvaxAddress.CELO_ALFAJORES
			default:
				return chainTicTacAvaxAddress.DEFAULT
		}
	}

	function getDestinationTicTacAvaxCrossAddress(
		ticTacAvaxCrossAddress: chainTicTacAvaxCrossAddress
	): string | undefined {
		switch (ticTacAvaxCrossAddress) {
			case chainTicTacAvaxCrossAddress.AVALANCHE_FUJI:
				return chainTicTacAvaxCrossAddress.AVALANCHE_FUJI
			case chainTicTacAvaxCrossAddress.CELO_ALFAJORES:
				return chainTicTacAvaxCrossAddress.CELO_ALFAJORES
			default:
				return chainTicTacAvaxCrossAddress.DEFAULT
		}
	}

	function getChainValue(chainEnum: chains): number {
		switch (chainEnum) {
			case chains.AVALANCHE_FUJI:
				return chainValues.AVALANCHE_FUJI
			case chains.CELO_ALFAJORES:
				return chainValues.CELO_ALFAJORES
			default:
				return Number(chainValues.DEFAULT)
		}
	}

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

		setBoard(convertBoardToSerializable(currentConnectedBoard))

		const currentRoundCount: bigint = await connectedTicTacAvax.roundCount()
		setRoundCount(Number(currentRoundCount))

		const currentLastMoveTimestamp: bigint =
			await connectedTicTacAvax.lastMoveTimestamp()

		const formatedCurrentLastMoveTimestamp: string = timestampToFormatedDate(
			currentLastMoveTimestamp
		)

		setLastMoveTimestamp(formatedCurrentLastMoveTimestamp)

		const currentWinner: string = await connectedTicTacAvax.winner()
		setWinner(currentWinner)

		const currentLastWinner: string =
			await connectedTicTacAvax.lastRoundWinner()

		setLastWinner(currentLastWinner)

		const currentGameCount: bigint = await connectedTicTacAvax.gameCount()
		setGameCount(Number(currentGameCount))

		const destinationChainEnum =
			(chainEnum as chains) === chains.CELO_ALFAJORES
				? chains.AVALANCHE_FUJI
				: chains.CELO_ALFAJORES

		const destinationChainName = getDestinationChain(
			destinationChainEnum === chains.CELO_ALFAJORES
				? chainNames.AVALANCHE_FUJI
				: chainNames.CELO_ALFAJORES
		)

		setDestinationChain(destinationChainName)

		const destinationTicTacAvaxAddress = getDestinationTicTacAvaxAddress(
			(chainEnum as chains) === chains.CELO_ALFAJORES
				? chainTicTacAvaxAddress.AVALANCHE_FUJI
				: chainTicTacAvaxAddress.CELO_ALFAJORES
		)

		// const destinationTicTacAvaxCrossAddress = getDestinationTicTacAvaxCrossAddress(
		// 	(chainEnum as chains) === chains.CELO_ALFAJORES
		// 		? chainTicTacAvaxCrossAddress.AVALANCHE_FUJI
		// 		: chainTicTacAvaxCrossAddress.CELO_ALFAJORES
		// )

		setDestinationAddress(destinationTicTacAvaxAddress)

		const chainValue: number = getChainValue(
			(chainEnum as chains) === chains.CELO_ALFAJORES
				? chains.AVALANCHE_FUJI
				: chains.CELO_ALFAJORES
		)

		setChainValue(chainValue)

		setIsLoading(false)
	}

	const onStartGame = async () => {
		try {
			setIsLoading(true)

			const startGameTx = await connectedTicTacAvax.startGame(
				destinationChain as string,
				destinationAddress as string,
				address as AddressLike,
				playerTwo as AddressLike,
				{
					value: chainValue
				}
			)

			await startGameTx.wait()
		} catch (error) {
			console.error(error)
			// TODO: toast error
		} finally {
			await fetchData()
		}
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
		])
	}

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
									currentRoundCount={roundCount}
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
