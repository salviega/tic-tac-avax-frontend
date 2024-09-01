import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { Circle, RotateCcw, X } from 'lucide-react'
import { Tilt } from 'react-tilt'
// import BackgroundAudio from '../BackGroundSound'
import { FaFileContract } from "react-icons/fa6";


import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'



import Avatar from '../Avatar'

const clickSound = new Audio('src/assets/sounds/hoverSound.wav')
const winSound = new Audio('src/assets/sounds/winSound.wav')

type SquareProps = {
	value: number
	onSquareClick: () => void
	isLoadingBoard: boolean
}

type TicTacToeProps = {
	board: number[][]
	setBoard: (board: number[][]) => void
	resetBoard: () => void
	currentRoundCount: number
	players: [string, string]
	winnerContract: string
	sendMovent: (row: number, column: number) => void
	isLoadingBoard: boolean
}
function LoadingOverlay() {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
			<div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
		</div>
	)
}

function Square({ value, onSquareClick, isLoadingBoard }: SquareProps) {
	const displayValue = value === 1 ? 'X' : value === 2 ? 'O' : null

	return (
		<Tilt className='group relative w-full h-full'>
			<motion.button
				className='
                w-[80px] h-[80px] 
                sm:w-[100px] sm:h-[100px] 
                md:w-[120px] md:h-[120px] 
                lg:w-[140px] lg:h-[140px] 
                xl:w-[160px] xl:h-[160px] 
                rounded-xl bg-opacity-50 border border-[#37005B] flex items-center justify-center 
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'
				onClick={onSquareClick}
				whileHover={{ scale: 1.05, boxShadow: '0 0 10px #37005B' }}
				whileTap={{ scale: 0.95 }}
				disabled={isLoadingBoard}
			>
				<AnimatePresence>
					{displayValue && (
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: 180 }}
							transition={{ type: 'spring', stiffness: 260, damping: 20 }}
						>
							{displayValue === 'X' ? (
								<X className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-pink-500' />
							) : (
								<Circle className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-400' />
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</Tilt>
	)
}

export default function CyberpunkBentoTicTacToe({
	board,
	setBoard,
	resetBoard,
	currentRoundCount,
	players,
	winnerContract,
	sendMovent,
	isLoadingBoard
}: TicTacToeProps) {
	const [xIsNext, setXIsNext] = useState(true)
	const [xScore, setXScore] = useState(0)
	const [oScore, setOScore] = useState(0)

	useEffect(() => {
		determineTurn()
		updateScores()
		const winner = calculateWinner(board)
		if (winner) {
			if (winner === 1) setXScore(prev => prev + 1)
			else if (winner === 2) setOScore(prev => prev + 1)
			winSound.play()
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
				colors: ['#00FFFF', '#FF00FF', '#FFFF00']
			})
		}
	}, [board])

	function determineTurn() {
		const xCount = board.flat().filter(value => value === 1).length
		const oCount = board.flat().filter(value => value === 2).length

		// Si la cantidad de X y O son iguales, le toca a X. Si hay un X más, le toca a O.
		setXIsNext(xCount === oCount)
	}

	function handleClick(row: number, col: number) {
		clickSound.play()
		if (calculateWinner(board) || board[row][col]) {
			return
		}
		const nextBoard = board.map(row => row.slice())
		nextBoard[row][col] = xIsNext ? 1 : 2
		setBoard(nextBoard)
		sendMovent(row, col)
		setXIsNext(!xIsNext)
	}

	const winner = calculateWinner(board)
	let status
	if (winner) {
		console.log('Winner:', winner)
		status = 'Winner: ' + (winner === 1 ? 'X' : 'O')
	} else if (board.flat().every(value => value !== 0)) {
		status = 'Draw!'
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O')
	}

	function updateScores() {
		const xCount = board.flat().filter(value => value === 1).length
		const oCount = board.flat().filter(value => value === 2).length
		setXScore(xCount)
		setOScore(oCount)
	}

	return (
		<div
			className={`min-h-screen p-8 flex items-center justify-center font-mono backdrop-blur animate__bounceIn`}
		>
			<div className='relative z-10 w-full max-w-4xl'>
				<div className="flex justify-center flex-col items-center mb-8">
					<img
						src="src/assets/images/TicTacToe-Avax.png"
						alt="Logo"
						className="w-[400px] mb-4"
					/>
					<a
						href="https://subnets-test.avax.network/c-chain/address/0x19E59c52971A88F5822e305921d52C9Bd1f06b4E"
						target="_blank"
						className="text-center text-[#FACC15] text-lg font-semibold flex items-center"
					>
						<FaFileContract className="mr-2 text-2xl" />
						<p className="truncate max-w-xs">
							0x19E59c52971A88F5822e305921d52C9Bd1f06b4E
						</p>
					</a>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Card className='md:col-span-2 bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_4px_#37005B] rounded-xl overflow-hidden'>
						<CardContent className="p-6 relative">
							{isLoadingBoard && <LoadingOverlay />}
							<div className={`grid grid-cols-3 gap-4 aspect-square ${isLoadingBoard ? 'pointer-events-none' : ''}`}>
								{board.map((row, rowIndex) =>
									row.map((value, colIndex) => (
										<Square
											key={`${rowIndex}-${colIndex}`}
											value={value}
											onSquareClick={() => handleClick(rowIndex, colIndex)}
											isLoadingBoard={isLoadingBoard}
										/>
									))
								)}
							</div>
						</CardContent>
					</Card>
					<div className='space-y-6'>
						<Card className='bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-xl overflow-hidden'>
							<CardContent className='p-6'>
								<h2 className='text-xl font-semibold mb-4 text-white text-center'>
									Score
								</h2>
								<div className='flex justify-between items-center'>
									<div className='text-center'>
										<X className='w-8 h-8 text-pink-500 mx-auto' />
										<p className='text-2xl font-bold text-pink-500 mt-2'>
											{xScore}
										</p>
									</div>
									<div className='text-center'>
										<Circle className='w-8 h-8 text-yellow-400 mx-auto' />
										<p className='text-2xl font-bold text-yellow-400 mt-2'>
											{oScore}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-xl overflow-hidden'>
							<CardContent className='p-6 flex flex-col justify-center'>
								<h2 className='text-xl font-semibold mb-4 text-white text-center'>
									Status
								</h2>
								<p className='text-lg text-center mb-4 font-medium text-[#00FFFF]'>
									{status}
								</p>
								<p className='text-xl font-semibold mb-4 text-white text-center'>
									Último ganador
								</p>
								<Avatar address={winnerContract} />
							</CardContent>
						</Card>

						<Card className='bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-xl overflow-hidden'>
							<CardContent className='p-6'>
								<h2 className='text-xl font-semibold mb-4 text-white text-center'>
									Statistics
								</h2>
								<div className='space-y-2'>
									<p className='text-yellow-400'>
										Total Games: {currentRoundCount}
									</p>
									<p className='text-yellow-400'>Player 1:</p>
									<Avatar address={players[0]} />
									<p className='text-yellow-400'>Player 2:</p>
									<Avatar address={players[1]} />
								</div>
							</CardContent>
						</Card>

						<Button
							onClick={resetBoard}
							className='w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-xl hover:from-cyan-600 hover:to-pink-600 transition-all duration-200  flex items-center justify-center gap-2'
						>
							<RotateCcw className='w-5 h-5' />
							New Game
						</Button>
					</div>
				</div>
			</div>
			<div className='cyberpunk-glitch'></div>
		</div>
	)
}

function calculateWinner(board: number[][]) {
	const lines = [
		// Horizontal lines
		[
			[0, 0],
			[0, 1],
			[0, 2]
		],
		[
			[1, 0],
			[1, 1],
			[1, 2]
		],
		[
			[2, 0],
			[2, 1],
			[2, 2]
		],
		// Vertical lines
		[
			[0, 0],
			[1, 0],
			[2, 0]
		],
		[
			[0, 1],
			[1, 1],
			[2, 1]
		],
		[
			[0, 2],
			[1, 2],
			[2, 2]
		],
		// Diagonal lines
		[
			[0, 0],
			[1, 1],
			[2, 2]
		],
		[
			[0, 2],
			[1, 1],
			[2, 0]
		]
	]
	for (let i = 0; i < lines.length; i++) {
		const [[a1, a2], [b1, b2], [c1, c2]] = lines[i]
		if (
			board[a1][a2] &&
			board[a1][a2] === board[b1][b2] &&
			board[a1][a2] === board[c1][c2]
		) {
			return board[a1][a2]
		}
	}
	return null
}
