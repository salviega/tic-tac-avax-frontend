import { useEffect, useRef, useState } from "react";
import { PowerGlitch } from "powerglitch";
import toast from "react-hot-toast";
import { GiRetroController } from "react-icons/gi";
import { Tilt } from "react-tilt";
import { useAccount } from "wagmi";

import BackgroundAudio from "../BackGroundSound";
import { Card, CardContent } from "../ui/card";


interface FormPlayersProps {
    startGame?: () => void;
}

export default function FormPlayers({ startGame }: FormPlayersProps) {
    const account = useAccount();
    const [players, setPlayers] = useState({
        player1: account.address,
        player2: "",
    });
    const glitchButton = useRef(null);
    useEffect(() => {
        if (glitchButton.current) {
            PowerGlitch.glitch(glitchButton.current, {
                playMode: "hover",
                timing: {
                    duration: 1000,
                    iterations: 15,
                    easing: "ease-in-out",
                },
            });
        }
    }, []);

    const handleChallenge = (e: any) => {
        e.preventDefault();
        if (players.player2 === "") { toast.error("Ingresa una dirección") }
        if (players.player1 === players.player2) { toast.error("No te puedes jugar contigo mismo") }
        if (!isValidBlockchainAddress(players.player2)) { toast.error("La dirección no tiene el formato correcto") }
        startGame && startGame();
    }
    const isValidBlockchainAddress = (address: string) => {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address);
    };
    return (
        <div className="p-4">
            <BackgroundAudio audioSrc='src/assets/sounds/menuSound.mp3' />
            <Tilt className="Tilt" options={{ scale: 1, max: 25 }}>
                <Card className="w-96 h-[auto] rounded-xl bg-[#0F0D0C]/50 backdrop-blur border-rose-400 border-2">
                    <CardContent className="space-y-4 flex justify-center flex-col items-center">
                        <form onSubmit={handleChallenge} className="flex justify-center items-center flex-col space-y-4">
                            <Tilt className="Tilt" options={{ scale: 1, max: 25 }}>
                                <div className="flex justify-center flex-col items-center">

                                    <img src="src/assets/images/logoTicTacToeAvax.webp" alt="logo Webp" className="size-[200px]" />
                                    <img src="src/assets/images/TicTacToe-Avax.png" alt="logo tic tac toe avax" />
                                </div>
                            </Tilt>
                            <input type="text" className="w-full rounded-xl p-3 bg-[#37005B] text-white" placeholder="0x00.." onChange={(e) => setPlayers({ ...players, player2: e.target.value })} required />
                            <button className="bg-[#37005B] w-full rounded-xl text-white p-2 items-center space-x-2 flex" ref={glitchButton}>
                                <GiRetroController /> <span>Jugar</span>
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </Tilt>

        </div>
    )
}