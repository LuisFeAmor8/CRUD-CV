const { pool } = require('../config/database');

// CREATE - Crear nueva experiencia profesional
const crearExperiencia = async (req, res) => {
  try {
    const { empresa, cargo, fecha_inicio, fecha_fin, descripcion, tecnologias } = req.body;
    
    // Validaciones básicas
    if (!empresa || !cargo || !fecha_inicio) {
      return res.status(400).json({
        error: 'Los campos empresa, cargo y fecha_inicio son obligatorios'
      });
    }

    const query = `
      INSERT INTO experiencias (empresa, cargo, fecha_inicio, fecha_fin, descripcion, tecnologias)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [empresa, cargo, fecha_inicio, fecha_fin, descripcion, tecnologias];
    const result = await pool.query(query, values);
    
    res.status(201).json({
      message: 'Experiencia creada exitosamente',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creando experiencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// READ - Obtener todas las experiencias
const obtenerExperiencias = async (req, res) => {
  try {
    const query = 'SELECT * FROM experiencias ORDER BY fecha_inicio DESC';
    const result = await pool.query(query);
    
    res.status(200).json({
      message: 'Experiencias obtenidas exitosamente',
      count: result.rows.length,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error obteniendo experiencias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// READ - Obtener experiencia por ID
const obtenerExperienciaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM experiencias WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experiencia no encontrada' });
    }
    
    res.status(200).json({
      message: 'Experiencia obtenida exitosamente',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error obteniendo experiencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// UPDATE - Actualizar experiencia
const actualizarExperiencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa, cargo, fecha_inicio, fecha_fin, descripcion, tecnologias } = req.body;
    
    // Verificar si la experiencia existe
    const checkQuery = 'SELECT * FROM experiencias WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Experiencia no encontrada' });
    }
    
    const query = `
      UPDATE experiencias 
      SET empresa = $1, cargo = $2, fecha_inicio = $3, fecha_fin = $4, 
          descripcion = $5, tecnologias = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    
    const values = [empresa, cargo, fecha_inicio, fecha_fin, descripcion, tecnologias, id];
    const result = await pool.query(query, values);
    
    res.status(200).json({
      message: 'Experiencia actualizada exitosamente',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error actualizando experiencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// DELETE - Eliminar experiencia
const eliminarExperiencia = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si la experiencia existe
    const checkQuery = 'SELECT * FROM experiencias WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Experiencia no encontrada' });
    }
    
    const query = 'DELETE FROM experiencias WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    res.status(200).json({
      message: 'Experiencia eliminada exitosamente',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error eliminando experiencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearExperiencia,
  obtenerExperiencias,
  obtenerExperienciaPorId,
  actualizarExperiencia,
  eliminarExperiencia
};