const express = require('express');
const router = express.Router();
const {
  crearExperiencia,
  obtenerExperiencias,
  obtenerExperienciaPorId,
  actualizarExperiencia,
  eliminarExperiencia
} = require('../controllers/experienciasController');

// Rutas para el CRUD de experiencias profesionales

// CREATE - POST /api/experiencias
router.post('/', crearExperiencia);

// READ - GET /api/experiencias (todas)
router.get('/', obtenerExperiencias);

// READ - GET /api/experiencias/:id (una específica)
router.get('/:id', obtenerExperienciaPorId);

// UPDATE - PUT /api/experiencias/:id
router.put('/:id', actualizarExperiencia);

// DELETE - DELETE /api/experiencias/:id
router.delete('/:id', eliminarExperiencia);

module.exports = router;