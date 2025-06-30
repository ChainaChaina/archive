-- SQL para testar imagens da internet
-- Execute no SQL Editor do Supabase

-- Exemplo com imagens aleatórias do Picsum
INSERT INTO covers (url, artCover, Title, Artist) VALUES
('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 'https://picsum.photos/400/400?random=1', 'Random Album 1', 'Test Artist'),
('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 'https://picsum.photos/400/400?random=2', 'Random Album 2', 'Another Artist'),
('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 'https://source.unsplash.com/400x400/?vinyl', 'Vinyl Collection', 'Music Lover');

-- Ou atualizar registros existentes
UPDATE covers 
SET 
  artCover = 'https://picsum.photos/400/400?random=' || id,
  Title = 'Album ' || id,
  Artist = 'Artist ' || id
WHERE id IS NOT NULL;
