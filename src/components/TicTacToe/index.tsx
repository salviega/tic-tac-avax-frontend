'use client'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
// import { Zap, Circle, RotateCcw, Moon, Sun, BarChart2, Volume2, VolumeX, X } from 'lucide-react'
import { BarChart2, Circle, RotateCcw, X } from 'lucide-react'
import { Tilt } from 'react-tilt'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const clickSound = new Audio('src/assets/sounds/hoverSound.wav')
// const winSound = new Audio('src/assets/sounds/winSound.wav')
// const drawSound = new Audio('/cyber-draw.mp3')
// const backgroundSoundTictactoe = new Audio('src/assets/sounds/backgroundSoundTictactoe.mp3')

type SquareProps = {
    value: string
    onSquareClick: () => void
}

function Square({ value, onSquareClick }: SquareProps) {
    return (
        <Tilt className="group relative w-full h-full">
            <motion.button
                className="
                w-[80px] h-[80px] 
                sm:w-[100px] sm:h-[100px] 
                md:w-[120px] md:h-[120px] 
                lg:w-[140px] lg:h-[140px] 
                xl:w-[160px] xl:h-[160px] 
                rounded-xl bg-opacity-50 border border-[#37005B] flex items-center justify-center 
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                onClick={() => {
                    clickSound.play();
                    onSquareClick();
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 10px #37005B" }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence>
                    {value && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {value === 'X' ? (
                                <X className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-pink-500" />
                            ) : (
                                <Circle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-400" />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

        </Tilt>
        // <motion.button
        //     className="w-full h-full rounded-lg  bg-opacity-50 border border-[#37005B]  flex items-center justify-center text-4xl font-bold "
        //     onClick={() => {
        //         clickSound.play()
        //         onSquareClick()
        //     }}
        //     whileHover={{ scale: 1.05, boxShadow: "0 0 10px #00FFFF" }}
        //     whileTap={{ scale: 0.95 }}
        // >
        //     <AnimatePresence>
        //         {value && (
        //             <motion.div
        //                 initial={{ scale: 0, rotate: -180 }}
        //                 animate={{ scale: 1, rotate: 0 }}
        //                 exit={{ scale: 0, rotate: 180 }}
        //                 transition={{ type: "spring", stiffness: 260, damping: 20 }}
        //             >
        //                 {value === 'X' ? <X className="w-8 h-8 text-pink-500" /> : <Circle className="w-8 h-8 text-yellow-400" />}
        //             </motion.div>
        //         )}
        //     </AnimatePresence>
        // </motion.button>
    )
}

export default function CyberpunkBentoTicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)
    const [xScore, setXScore] = useState(0)
    const [oScore, setOScore] = useState(0)
    // const [isDarkMode, setIsDarkMode] = useState(true)
    // const [isMuted, setIsMuted] = useState(false)
    const [showStats, setShowStats] = useState(false)

    useEffect(() => {
        const winner = calculateWinner(squares)
        if (winner) {
            if (winner === 'X') setXScore(prev => prev + 1)
            else setOScore(prev => prev + 1)
            // if (!isMuted) winSound.play()
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00FFFF', '#FF00FF', '#FFFF00']
            })
        } else if (squares.every(Boolean)) {
            // if (!isMuted) drawSound.play()
            console.log('Draw!')
        }
    }, [squares])

    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const nextSquares = squares.slice()
        nextSquares[i] = xIsNext ? 'X' : 'O'
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
    }

    function resetGame() {
        setSquares(Array(9).fill(null))
        setXIsNext(true)
        // if (!isMuted) clickSound.play()
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else if (squares.every(Boolean)) {
        status = 'Draw!'
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <div className={`min-h-screen p-8 flex items-center justify-center font-mono backdrop-blur`}>
            {/* <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10"></div> */}
            <div className="relative z-10 w-full max-w-4xl">

                <div className="flex justify-center flex-col items-center mb-8">
                    {/* <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600"></h1> */}
                    <img src="src/assets/images/TicTacToe-Avax.png" alt="Logo" className='w-[400px]' />
                    <div className="flex gap-2">
                        {/* <Button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-black bg-opacity-50 border border-cyan-500 shadow-[0_0_10px_#00FFFF] text-cyan-400 hover:bg-cyan-900 hover:bg-opacity-30"
                        >
                            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                        </Button> */}
                        {/* 
                        <Button
                            onClick={() => setIsMuted(!isMuted)}
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-black bg-opacity-50 border border-cyan-500 shadow-[0_0_10px_#00FFFF] text-cyan-400 hover:bg-cyan-900 hover:bg-opacity-30"
                            >
                            {isMuted ? <VolumeX className="h-[1.2rem] w-[1.2rem]" /> : <Volume2 className="h-[1.2rem] w-[1.2rem]" />}
                        </Button>
                            */}
                        <Button
                            onClick={() => setShowStats(!showStats)}
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_10px_#37005B] text-[#37005B] hover:bg-cyan-900 hover:bg-opacity-30"
                        >
                            <BarChart2 className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_4px_#37005B] rounded-xl overflow-hidden">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-3 gap-4 aspect-square">
                                {squares.map((value, index) => (
                                    <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Card className="bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4 text-white text-center">Score</h2>
                                <div className="flex justify-between items-center">
                                    <div className="text-center">
                                        <X className="w-8 h-8 text-pink-500 mx-auto" />
                                        <p className="text-2xl font-bold text-pink-500 mt-2">{xScore}</p>
                                    </div>
                                    <div className="text-center">
                                        <Circle className="w-8 h-8 text-yellow-400 mx-auto" />
                                        <p className="text-2xl font-bold text-yellow-400 mt-2">{oScore}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4 text-white text-center">Status</h2>
                                <p className="text-lg text-center font-medium text-[#00FFFF]">{status}</p>
                            </CardContent>
                        </Card>
                        {showStats && (
                            <Card className="bg-black bg-opacity-50 border border-[#37005B] shadow-[0_0_20px_#37005B] rounded-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4 text-cyan-400">Statistics</h2>
                                    <div className="space-y-2">
                                        <p className="text-yellow-400">Total Games: {xScore + oScore}</p>
                                        <p className="text-yellow-400">X Win Rate: {xScore + oScore > 0 ? ((xScore / (xScore + oScore)) * 100).toFixed(1) : 0}%</p>
                                        <p className="text-yellow-400">O Win Rate: {xScore + oScore > 0 ? ((oScore / (xScore + oScore)) * 100).toFixed(1) : 0}%</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <Button
                            onClick={resetGame}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-xl hover:from-cyan-600 hover:to-pink-600 transition-all duration-200  flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            New Game
                        </Button>
                    </div>
                </div>

            </div>
            <div className="cyberpunk-glitch"></div>
        </div >
    )
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}