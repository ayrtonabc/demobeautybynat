import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware simple: deja pasar todas las solicitudes sin modificar.
// El panel de administración se sirve como SPA estático vía rewrites en next.config.js
export function middleware(_request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image).*)'],
};
