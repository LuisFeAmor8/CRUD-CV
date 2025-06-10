const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
// Prioriza DATABASE_URL si existe (para Neon y producción)
const pool = process.env.DATABASE_URL 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Necesario para Neon
      }
    })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL');
    
    // Mostrar a qué base de datos se conectó
    const result = await client.query('SELECT current_database()');
    console.log('📍 Conectado a la base de datos:', result.rows[0].current_database);
    
    client.release();
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error.message);
  }
};

module.exports = {
  pool,
  testConnection
};