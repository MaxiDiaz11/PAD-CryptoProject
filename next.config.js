module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // La ruta desde tu frontend
        destination: 'https://65ce-181-87-31-150.ngrok-free.app/api/:path*', // La URL de tu API a través de Ngrok
      },
    ];
  },
  // Otras configuraciones de tu proyecto Next.js...
};