import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paths = [], tags = [], token } = body;

    // Verificar token de revalidación
    const revalidateToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
    if (revalidateToken && token !== revalidateToken) {
      return NextResponse.json(
        { error: 'Token de revalidación inválido' },
        { status: 401 }
      );
    }

    // Revalidar rutas específicas
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    // Revalidar por tags
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    // Si no se especificaron rutas, revalidar todo
    if ((!paths || paths.length === 0) && (!tags || tags.length === 0)) {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      paths: paths || [],
      tags: tags || [],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error en revalidación:', error);
    return NextResponse.json(
      { error: 'Error al revalidar' },
      { status: 500 }
    );
  }
}

// GET para verificar que el endpoint funciona
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API de revalidación activa',
    usage: 'POST con { paths: ["/", "/uslugi"], token: "tu-token" }',
  });
}