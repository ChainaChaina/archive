import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone da response para modificar headers
  const response = NextResponse.next()
  
  // Adicionar headers para resolver problemas de cookies
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // Headers específicos para Supabase
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey')
  
  // Permitir cookies do Supabase apenas do domínio correto
  if (request.url.includes('supabase.co')) {
    response.headers.set('SameSite', 'None')
    response.headers.set('Secure', 'true')
  }
  
  return response
}

// Aplicar middleware apenas em rotas específicas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}