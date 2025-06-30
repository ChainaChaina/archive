"use client"
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './vinyl.css';
import { useAudio } from '../../../contexts/AudioContext';

interface VinylProps {
    audioSrc: string;
    coverSrc: string;
    title: string;
    artist: string;
    vinylSrc: string;
    className?: string;
    id?: string; // ID único para identificar este vinyl
}

const Vinyl: React.FC<VinylProps> = ({ audioSrc, coverSrc, title, artist, vinylSrc, className = '', id }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const vinylRef = useRef<HTMLImageElement>(null);
    const rotationTween = useRef<gsap.core.Tween | null>(null);

    // Usar o contexto de áudio
    const { isPlaying, playAudio, pauseAudio } = useAudio();

    // Gerar ID único se não fornecido
    const vinylId = id || `vinyl-${audioSrc.slice(-10)}`;
    const isCurrentlyPlaying = isPlaying(vinylId);

    useEffect(() => {
        // Inicializa a animação parada
        if (vinylRef.current) {
            gsap.set(vinylRef.current, { rotation: 0 });
        }
    }, []);

    // Sincronizar animação com o estado do contexto
    useEffect(() => {
        if (isCurrentlyPlaying) {
            // Começar animação
            if (vinylRef.current && !rotationTween.current) {
                rotationTween.current = gsap.to(vinylRef.current, {
                    rotation: "+=360",
                    duration: 8,
                    repeat: -1,
                    ease: "none"
                });
            }
        } else {
            // Parar animação com desaceleração
            if (rotationTween.current && vinylRef.current) {
                const currentRotation = gsap.getProperty(vinylRef.current, "rotation") as number;
                rotationTween.current.kill();

                gsap.to(vinylRef.current, {
                    rotation: currentRotation + 30,
                    duration: 2,
                    ease: "power3.out"
                });

                rotationTween.current = null;
            }
        }
    }, [isCurrentlyPlaying]);

    const handleVinylClick = () => {
        if (isCurrentlyPlaying) {
            pauseAudio(vinylId);
        } else {
            playAudio(vinylId, audioRef);
        }
    };

    const handleAudioEnded = () => {
        pauseAudio(vinylId);
    };

    return (
        <div className={`flex flex-col ${className}`}>
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
            />
            <div>
                <h1 className="text-3xl"><strong>{title}</strong></h1>
                <div className="font-light"><span className='italic'>originally by:</span> {artist}</div>
            </div>
            <div ref={vinylRef} className='vinyl_container' onClick={handleVinylClick} style={{ cursor: 'pointer' }}>
                <img className='cover' src={coverSrc || "/missiles.jpg"} alt="Album cover" />
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