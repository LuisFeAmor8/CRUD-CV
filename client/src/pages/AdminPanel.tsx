import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { experienceService } from '../services/experienceService';
import { Experience, ExperienceFormData } from '../types/Experience';
import Swal from 'sweetalert2';

const AdminPanel: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>({
    empresa: '',
    cargo: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    tecnologias: ''
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAllExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      setError('Error cargando las experiencias');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        empresa: experience.empresa,
        cargo: experience.cargo,
        fecha_inicio: experience.fecha_inicio.split('T')[0],
        fecha_fin: experience.fecha_fin.split('T')[0],
        descripcion: experience.descripcion,
        tecnologias: experience.tecnologias
      });
    } else {
      setEditingExperience(null);
      setFormData({
        empresa: '',
        cargo: '',
        fecha_inicio: '',
        fecha_fin: '',
        descripcion: '',
        tecnologias: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExperience(null);
    setFormData({
      empresa: '',
      cargo: '',
      fecha_inicio: '',
      fecha_fin: '',
      descripcion: '',
      tecnologias: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingExperience) {
        await experienceService.updateExperience(editingExperience.id!, formData);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'La experiencia ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonColor: '#3EB0F9'
        });
      } else {
        await experienceService.createExperience(formData);
        Swal.fire({
          title: '¡Creado!',
          text: 'La experiencia ha sido creada correctamente.',
          icon: 'success',
          confirmButtonColor: '#3EB0F9'
        });
      }
      
      handleCloseModal();
      loadExperiences();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al guardar la experiencia.',
        icon: 'error',
        confirmButtonColor: '#dc3545'
      });
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: number, empresa: string, cargo: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la experiencia "${cargo}" en "${empresa}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await experienceService.deleteExperience(id);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'La experiencia ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#3EB0F9'
        });
        loadExperiences();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al eliminar la experiencia.',
          icon: 'error',
          confirmButtonColor: '#dc3545'
        });
        console.error('Error:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <Container className="admin-container">
      <div className="admin-header">
        <h2>
          <i className="fas fa-cogs"></i>
          Panel de Administración - Experiencias Profesionales
        </h2>
        <p className="text-white">Gestiona las experiencias profesionales que aparecen en tu portafolio</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="success" 
          onClick={() => handleShowModal()}
          size="lg"
        >
          <i className="fas fa-plus me-2"></i>
          Nueva Experiencia
        </Button>
        <Button 
          variant="primary" 
          onClick={loadExperiences}
          disabled={loading}
        >
          <i className="fas fa-sync-alt me-2"></i>
          Actualizar
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" />
          <span className="ms-3">Cargando experiencias...</span>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Tecnologías</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <i className="fas fa-inbox fa-2x text-muted mb-3"></i>
                    <br />
                    No hay experiencias registradas
                  </td>
                </tr>
              ) : (
                experiences.map((experience) => (
                  <tr key={experience.id}>
                    <td>{experience.id}</td>
                    <td><strong>{experience.empresa}</strong></td>
                    <td>{experience.cargo}</td>
                    <td>{formatDate(experience.fecha_inicio)}</td>
                    <td>{formatDate(experience.fecha_fin)}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {experience.tecnologias.split(',').length} tecnologías
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(experience)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(experience.id!, experience.empresa, experience.cargo)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal para crear/editar experiencia */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`fas ${editingExperience ? 'fa-edit' : 'fa-plus'} me-2`}></i>
            {editingExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Empresa *</Form.Label>
                  <Form.Control
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    placeholder="Nombre de la empresa"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cargo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    required
                    placeholder="Título del puesto"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Inicio *</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_inicio"
                    value={formData.fecha_inicio}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Fin *</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_fin"
                    value={formData.fecha_fin}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                placeholder="Describe las responsabilidades y logros en este puesto..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tecnologías *</Form.Label>
              <Form.Control
                type="text"
                name="tecnologias"
                value={formData.tecnologias}
                onChange={handleInputChange}
                required
                placeholder="React, Node.js, PostgreSQL, etc."
              />
              <Form.Text className="text-muted">
                Separa las tecnologías con comas
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              <i className={`fas ${editingExperience ? 'fa-save' : 'fa-plus'} me-2`}></i>
              {editingExperience ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminPanel; 