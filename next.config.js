/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pb.fullwork.pl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redirigir /panel/demo a /panel/login (la página demo fue eliminada)
        source: '/panel/demo',
        destination: '/panel/login',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Servir el index.html del panel SPA para todas las rutas /panel/*
        // excepto los assets estáticos (js, css, etc.) que se sirven directamente desde public/
        // Next.js sirve archivos estáticos desde public/ antes de aplicar rewrites,
        // así que los assets en /panel/assets/* se sirven directamente.
        // Esta rewrite atrapa las rutas del SPA (ej: /panel/settings) para
        // que React Router del panel pueda manejarlas del lado del cliente.
        source: '/panel/:path*',
        destination: '/panel/index.html',
      },
    ];
  },
};

module.exports = nextConfig;