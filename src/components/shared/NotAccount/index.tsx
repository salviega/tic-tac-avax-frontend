import { useEffect, useRef } from "react";
import { PowerGlitch } from "powerglitch";
import { useAccount } from "wagmi"


export default function NotAccount() {
    const { isConnecting } = useAccount();
    const glitchImage = useRef(null)
    useEffect(() => {
        if (glitchImage.current) {
            PowerGlitch.glitch(glitchImage.current, {
                playMode: "always"
            })
        }
    }, [])
    return (
        <div className="">
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-[200px]">
                    🤨
                </h1>
                <h1 className="text-white font-bold text-xl">
                    Por favor conecta una cuenta, para jugar.
                </h1>
            </div>
        </div >
    )
}