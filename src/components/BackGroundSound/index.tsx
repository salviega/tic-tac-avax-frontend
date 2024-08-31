import React, { useEffect, useRef } from 'react';

interface BackgroundAudioProps {
    audioSrc: string;
}

const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ audioSrc }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => {
                    const resumeAudio = () => {
                        audioRef.current?.play().catch(err => console.error("No se pudo reproducir el audio: ", err));
                        window.removeEventListener('click', resumeAudio);
                    };

                    window.addEventListener('click', resumeAudio);
                });
            }
        };

        playAudio();
    }, []);

    return <audio ref={audioRef} src={audioSrc} loop autoPlay />;
};

export default BackgroundAudio;
