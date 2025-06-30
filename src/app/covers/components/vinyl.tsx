"use client"
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './vinyl.css';

interface VinylProps {
    audioSrc: string;
    coverSrc: string;
    vinylSrc: string;
    className?: string;
}

const Vinyl: React.FC<VinylProps> = ({ audioSrc, coverSrc, vinylSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const vinylRef = useRef<HTMLImageElement>(null);
    const rotationTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        // Inicializa a animação parada
        if (vinylRef.current) {
            gsap.set(vinylRef.current, { rotation: 0 });
        }
    }, []);

    const handleVinylClick = () => {
        if (audioRef.current && vinylRef.current) {
            if (isPlaying) {
                // Pausar áudio
                audioRef.current.pause();
                setIsPlaying(false);

                // Para a animação com desaceleração gradual
                if (rotationTween.current) {
                    // Pega a rotação atual
                    const currentRotation = gsap.getProperty(vinylRef.current, "rotation") as number;

                    // Para a animação infinita
                    rotationTween.current.kill();

                    // Cria animação de desaceleração (mais 30 graus com ease out)
                    handleVinylStopAnimation(currentRotation);
                }
            } else {
                // Reproduzir áudio e animação
                audioRef.current.play().catch(error => {
                    console.error('Error playing audio:', error);
                    setIsPlaying(false);
                });
                setIsPlaying(true);

                // Cria nova animação infinita
                rotationTween.current = gsap.to(vinylRef.current, {
                    rotation: "+=360",
                    duration: 8,
                    repeat: -1,
                    ease: "none"
                });
            }
        }
    };

    const handleVinylStopAnimation = (currentRotation: number) => {
        gsap.to(vinylRef.current, {
            rotation: currentRotation + 30,
            duration: 2,
            ease: "power3.out"
        });
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        if (rotationTween.current && vinylRef.current) {
            // Para a animação com desaceleração quando o áudio termina
            const currentRotation = gsap.getProperty(vinylRef.current, "rotation") as number;
            rotationTween.current.kill();

            handleVinylStopAnimation(currentRotation);
        }
    };

    return (
        <div className={`flex flex-col`}>
            <audio
                style={{ display: 'none' }}
                ref={audioRef}
                controls
                src={audioSrc}
                onEnded={handleAudioEnded}
                onError={(e) => {
                    console.error('Audio error:', e);
                    console.error('Audio source:', audioSrc);
                }}
            // onLoadStart={() => console.log('Audio loading started')}
            // onCanPlay={() => console.log('Audio can play')}
            />

            <div ref={vinylRef} className='vinyl_container' onClick={handleVinylClick} style={{ cursor: 'pointer' }}>
                <img className='cover' src={coverSrc} alt="Album cover" />
                <img

                    src={vinylSrc}
                    className="filter vinyl"
                    alt="Vinyl"
                />
            </div>
        </div>
    );
};

export default Vinyl;