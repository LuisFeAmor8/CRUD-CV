const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar rutas
const experienciasRoutes = require('./routes/experiencias');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(express.json()); // Para poder leer JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Para formularios

// Solo backend - sin archivos estáticos de React

// Middleware para logging de peticiones
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de bienvenida
app.get('/api', (req, res) => {
  res.json({
    message: '🚀 API de Experiencias Profesionales',
    version: '1.0.0',
    endpoints: {
      'GET /api/experiencias': 'Obtener todas las experiencias',
      'GET /api/experiencias/:id': 'Obtener experiencia por ID',
      'POST /api/experiencias': 'Crear nueva experiencia',
      'PUT /api/experiencias/:id': 'Actualizar experiencia',
      'DELETE /api/experiencias/:id': 'Eliminar experiencia'
    }
  });
});

// Usar las rutas de experiencias
app.use('/api/experiencias', experienciasRoutes);

// Ruta catch-all para API only

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'La ruta que buscas no existe en esta API'
  });
});

// Middleware para manejo de errores globales
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal en el servidor'
  });
});

module.exports = app;