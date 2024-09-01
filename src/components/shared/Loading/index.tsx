import { useEffect, useRef } from 'react';
import { PowerGlitch } from 'powerglitch';

export default function Loading() {
    const glitchText = useRef(null);
    useEffect(() => {
        if (glitchText.current) {
            PowerGlitch.glitch(glitchText.current, {
                playMode: 'always',
                hideOverflow: true,
                timing: {
                    duration: 1000,
                    iterations: 15,
                    easing: 'ease-in-out',
                },
            });
        }
    }, []);

    return (
        <div className="loading flex justify-center flex-col items-center">
            <img
                src="images/logoTicTacToeAvax.webp"
                alt="Logo Avax TicTacToe"
                className="size-[200px] rounded-md"
            />
            <div className="glitch-text" ref={glitchText}>
                <img
                    src="images/TicTacToe-Avax.png"
                    alt="TicTacToe Avax"
                    className="w-[400px] h-[auto]"
                />
            </div>
        </div>
    );
}
