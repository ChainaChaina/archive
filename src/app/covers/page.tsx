"use client"
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './page.css';
import Vinyl from './components/vinyl';

const ArchivePage: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const vinylRef = useRef<HTMLImageElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
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

                    // Cria animação de desaceleração (mais 180 graus com ease out)
                    handleVinylStopAnimation(gsap, currentRotation);
                }
            } else {
                // Reproduzir áudio e animação
                audioRef.current.play();
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

    const handleVinylStopAnimation = (gsap: any, currentRotation: any) => {
        gsap.to(vinylRef.current, {
            rotation: currentRotation + 30,
            duration: 2,
            ease: "power3.out"
        });
    }

    const handleAudioEnded = () => {
        setIsPlaying(false);
        if (rotationTween.current) {
            // Para a animação com desaceleração quando o áudio termina
            const currentRotation = gsap.getProperty(vinylRef.current, "rotation") as number;
            rotationTween.current.kill();

            handleVinylStopAnimation(gsap, currentRotation);
        }
    };

    return (
        <div className="flex flex-col">
            <Vinyl coverSrc="/missiles.jpg"
                vinylSrc='/vinyl.png'
                audioSrc='https://zuxhgukxibznkuzhgdjb.supabase.co/storage/v1/object/sign/covers/WhatsApp%20Audio%202025-06-24%20at%2000.22.56.mpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MjgyZTQ0Ni00MWMzLTQ5OWEtOTg5NC1hZjM3N2ZhNDI2YjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3ZlcnMvV2hhdHNBcHAgQXVkaW8gMjAyNS0wNi0yNCBhdCAwMC4yMi41Ni5tcGVnIiwiaWF0IjoxNzUwNzQ4Mzg2LCJleHAiOjE3ODIyODQzODZ9.KVGuec5O8aOEdLbJWscgoCGnhPKO5tbuAjoZWEfEj4Y'>
            </Vinyl>

        </div>
    );
};


export default ArchivePage;
