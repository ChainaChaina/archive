"use client"
import React, { createContext, useContext, useState, useRef } from 'react';

interface AudioContextType {
  currentPlaying: string | null;
  setCurrentPlaying: (id: string | null) => void;
  isPlaying: (id: string) => boolean;
  playAudio: (id: string, audioRef: React.RefObject<HTMLAudioElement>) => void;
  pauseAudio: (id: string) => void;
  pauseAll: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio deve ser usado dentro de AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, React.RefObject<HTMLAudioElement>>>(new Map());

  const isPlaying = (id: string) => {
    return currentPlaying === id;
  };

  const playAudio = (id: string, audioRef: React.RefObject<HTMLAudioElement>) => {
    // Pausa qualquer áudio que esteja tocando
    pauseAll();
    
    // Registra a referência do áudio
    audioRefs.current.set(id, audioRef);
    
    // Toca o novo áudio
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
      });
      setCurrentPlaying(id);
    }
  };

  const pauseAudio = (id: string) => {
    const audioRef = audioRefs.current.get(id);
    if (audioRef?.current) {
      audioRef.current.pause();
    }
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    }
  };

  const pauseAll = () => {
    // Pausa todos os áudios registrados
    audioRefs.current.forEach((audioRef, id) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    });
    setCurrentPlaying(null);
  };

  const value: AudioContextType = {
    currentPlaying,
    setCurrentPlaying,
    isPlaying,
    playAudio,
    pauseAudio,
    pauseAll
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
