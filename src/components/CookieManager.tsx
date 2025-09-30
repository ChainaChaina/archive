"use client"
import { useEffect } from 'react';

// Component para limpar cookies problemáticos do Supabase
export default function CookieManager() {
  useEffect(() => {
    // Função para limpar cookies problemáticos
    const clearProblematicCookies = () => {
      // Lista de cookies que podem causar problemas
      const problematicCookies = [
        'sb-access-token',
        'sb-refresh-token',
        'supabase-auth-token',
        'supabase.auth.token'
      ];
      
      problematicCookies.forEach(cookieName => {
        // Tentar remover cookie do domínio atual
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        
        // Tentar remover cookie do domínio do Supabase
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.supabase.co;`;
      });
    };

    // Interceptar tentativas de definir cookies problemáticos
    const originalSetCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.set;
    
    if (originalSetCookie) {
      Object.defineProperty(document, 'cookie', {
        set: function(value) {
          // Verificar se é um cookie problemático
          const isProblematicCookie = value.includes('supabase') || value.includes('sb-');
          
          if (isProblematicCookie) {
            console.warn('🍪 Blocked problematic cookie:', value);
            return; // Bloquear o cookie
          }
          
          // Permitir outros cookies
          originalSetCookie?.call(this, value);
        },
        get: function() {
          return document.cookie;
        }
      });
    }

    // Limpar cookies existentes
    clearProblematicCookies();

    // Monitorar mudanças de foco para limpar cookies periodicamente
    const handleFocus = () => clearProblematicCookies();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null; // Este componente não renderiza nada
}