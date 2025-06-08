const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await testConnection();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log('🚀 Servidor iniciado exitosamente');
      console.log(`📍 Servidor corriendo en: http://localhost:${PORT}`);
      console.log(`🔗 API endpoints: http://localhost:${PORT}/api/experiencias`);
      console.log('⚡ Presiona Ctrl+C para detener el servidor');
    });
    
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

// Manejar cierre graceful del servidor
process.on('SIGINT', () => {
  console.log('\n🛑 Deteniendo servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Deteniendo servidor...');
  process.exit(0);
});

// Iniciar el servidor
startServer();