import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { experienceService } from '../services/experienceService';
import { Experience } from '../types/Experience';

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el formulario de contacto
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactError, setContactError] = useState<string>('');
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

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
      setError('Error cargando las experiencias profesionales');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  // Funciones para el formulario de contacto
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores cuando el usuario empiece a escribir
    if (contactError) {
      setContactError('');
    }
    if (contactSuccess) {
      setContactSuccess(false);
    }
  };

  const validateContactForm = () => {
    const { name, email, message } = contactForm;

    // Verificar campos vacíos
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setContactError('Por favor, completa todos los campos.');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setContactError('Por favor, introduce un correo electrónico válido.');
      return false;
    }

    // Validar longitud del mensaje
    if (message.length < 10) {
      setContactError('El mensaje debe tener al menos 10 caracteres.');
      return false;
    }

    return true;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateContactForm()) {
      setContactSuccess(true);
      setContactError('');
      // Aquí podrías enviar el formulario a un servidor
      console.log('Formulario enviado:', contactForm);
      
      // Limpiar formulario después del envío exitoso
      setContactForm({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header animate-fade-in">
        <img src="/img/i_am.png" alt="Mi foto de perfil" className="profile-image" />
        <div className="profile-info">
          <h1>Luis Felipe Amorocho Ayala</h1>
          <p className="profile-username">@pipe</p>
          <div className="social-icons">
            <a href="https://github.com/LuisFeAmor8?tab=repositories" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Sobre Mí */}
      <div className="animate-fade-in">
        <h2 className="section-title">Sobre mí</h2>
        <p className="mb-4">
          Soy un estudiante con conocimientos en tecnología y programación, con interés en especializarse en full-Stack
          y desarrollo de aplicaciones web. Me apasiona aprender nuevas tecnologías y mejorar mis habilidades
          técnicas. Busco una oportunidad para aplicar mis conocimientos y contribuir a proyectos innovadores en el
          campo de la tecnología. Mi lema es <strong style={{color: '#3EB0F9'}}>"Transformando ideas en experiencias
          digitales memorables"</strong>.
        </p>
      </div>

      {/* Experiencias Profesionales */}
      <div className="animate-fade-in">
        <h2 className="section-title">Experiencias Profesionales</h2>
        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
            <span className="ms-3">Cargando experiencias...</span>
          </div>
        ) : error ? (
          <Alert variant="warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        ) : experiences.length > 0 ? (
          experiences.map((experience) => (
            <div key={experience.id} className="custom-card card-projects">
              <i className="fas fa-briefcase card-icon"></i>
              <div className="card-content">
                <div className="card-title">{experience.cargo}</div>
                <div className="card-subtitle">
                  <strong>{experience.empresa}</strong> • {formatDate(experience.fecha_inicio)} - {formatDate(experience.fecha_fin)}
                </div>
                <p className="mt-2">{experience.descripcion}</p>
                <div className="mt-2">
                  <strong>Tecnologías:</strong> {experience.tecnologias}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Alert variant="info">
            <i className="fas fa-info-circle me-2"></i>
            No hay experiencias profesionales registradas aún.
          </Alert>
        )}
      </div>

      {/* Educación */}
      <div className="animate-fade-in">
        <h2 className="section-title">Educación</h2>
        <div className="custom-card card-education1">
          <i className="fas fa-graduation-cap card-icon"></i>
          <div className="card-content">
            <div className="card-title">Bachiller</div>
            <div className="card-subtitle">Bachiller Graduado - Colegio Fátima Olaya - 2022</div>
          </div>
        </div>
        <div className="custom-card card-education">
          <i className="fas fa-graduation-cap card-icon"></i>
          <div className="card-content">
            <div className="card-title">Ingeniería en Software</div>
            <div className="card-subtitle">Universidad de Cartagena - Ing Software - 2023 - actualidad</div>
          </div>
        </div>
      </div>

      {/* Habilidades */}
      <div className="animate-fade-in">
        <h2 className="section-title">Habilidades</h2>
        <div className="custom-card card-skills">
          <i className="fas fa-code card-icon"></i>
          <div className="card-content">
            <div className="card-title">Desarrollo Frontend</div>
            <div className="card-subtitle">HTML, CSS, JavaScript, Bootstrap, React, TypeScript</div>
          </div>
        </div>
        <div className="custom-card card-skills">
          <i className="fas fa-server card-icon"></i>
          <div className="card-content">
            <div className="card-title">Desarrollo Backend</div>
            <div className="card-subtitle">Python, MySQL, PostgreSQL, Java, Node.js, Express, Patrones de diseño</div>
          </div>
        </div>
        <div className="custom-card card-skills">
          <i className="fas fa-tools card-icon"></i>
          <div className="card-content">
            <div className="card-title">Herramientas</div>
            <div className="card-subtitle">Git, Github, Postman, Docker</div>
          </div>
        </div>
      </div>

      {/* Proyectos */}
      <div className="animate-fade-in">
        <h2 className="section-title">Proyectos</h2>
        <div className="custom-card card-projects">
          <i className="fas fa-project-diagram card-icon"></i>
          <div className="card-content">
            <div className="card-title">Seguridad-facial</div>
            <div className="card-subtitle">
              Creación de un prototipo de gestión de entradas en una institución educativa
              para mejorar la seguridad (Proyecto académico)
            </div>
          </div>
        </div>
        <div className="custom-card card-projects">
          <i className="fas fa-project-diagram card-icon"></i>
          <div className="card-content">
            <div className="card-title">Encriptador de texto</div>
            <div className="card-subtitle">
              Desarrollo de una página web que permite ingresar texto y elegir entre dos opciones: encriptar o
              desencriptar dicho texto.
            </div>
            <div className="mt-3">
              <a 
                href="https://github.com/LuisFeAmor8/texto-encriptado"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                <i className="fab fa-github" style={{marginRight: '0.5rem'}}></i>Ver en GitHub
              </a>
              <a 
                href="https://luisfeamor8.github.io/texto-encriptado/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                Ver proyecto
              </a>
            </div>
          </div>
        </div>
        <div className="custom-card card-projects">
          <i className="fas fa-project-diagram card-icon"></i>
          <div className="card-content">
            <div className="card-title">Juego secreto</div>
            <div className="card-subtitle">
              Es una página web creada en JavaScript que pide un número del 1 al 10.
              Mediante pistas, te va indicando si el número ingresado es mayor o menor que el número ya
              predeterminado. Si aciertas el número, te muestra la cantidad de veces que has participado.
            </div>
            <div className="mt-3">
              <a 
                href="https://github.com/LuisFeAmor8/Juego-secreto"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                <i className="fab fa-github" style={{marginRight: '0.5rem'}}></i>Ver en GitHub
              </a>
              <a 
                href="https://luisfeamor8.github.io/Juego-secreto/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                Ver proyecto
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="animate-fade-in">
        <h2 className="section-title">Contacto</h2>
        <div className="contact-row">
          <div className="contact-col">
            <div className="custom-card card-contact">
              <i className="fas fa-envelope card-icon"></i>
              <div className="card-content">
                <div className="card-title">Email</div>
                <div className="card-subtitle">lamorochoayala@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="contact-col">
            <div className="custom-card card-contact">
              <i className="fas fa-phone card-icon"></i>
              <div className="card-content">
                <div className="card-title">Teléfono</div>
                <div className="card-subtitle">+57 300 686 8810</div>
              </div>
            </div>
          </div>
          <div className="contact-col">
            <div className="custom-card card-contact">
              <i className="fas fa-map-marker-alt card-icon"></i>
              <div className="card-content">
                <div className="card-title">Ubicación</div>
                <div className="card-subtitle">Magangué Bolívar, Colombia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de contacto */}
      <div className="animate-fade-in">
        <h2 className="section-title">Formulario de contacto</h2>
        <div className="form-container">
          {/* Mensajes de error y éxito */}
          {contactError && (
            <Alert variant="danger" className="mb-3">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {contactError}
            </Alert>
          )}
          {contactSuccess && (
            <Alert variant="success" className="mb-3">
              <i className="fas fa-check-circle me-2"></i>
              ¡Mensaje enviado con éxito!
            </Alert>
          )}
          
          <form onSubmit={handleContactSubmit}>
            <div className="contact-row">
              <div className="contact-col">
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input 
                    type="text" 
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    className="form-control" 
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>
              <div className="contact-col">
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input 
                    type="email" 
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    className="form-control" 
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje:</label>
              <textarea 
                name="message"
                value={contactForm.message}
                onChange={handleContactInputChange}
                className="form-control" 
                rows={5} 
                placeholder="Escribe tu mensaje aquí... (mínimo 10 caracteres)"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{width: '100%'}}>
              <i className="fas fa-paper-plane" style={{marginRight: '0.5rem'}}></i>
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home; 