import axios from 'axios';
import { Experience, ExperienceFormData } from '../types/Experience';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://crud-cv-1.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/experiencias`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceService = {
  // Obtener todas las experiencias
  getAllExperiences: async (): Promise<Experience[]> => {
    try {
      const response = await api.get('/');
      // La API devuelve { message, count, data }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error obteniendo experiencias:', error);
      throw error;
    }
  },

  // Obtener experiencia por ID
  getExperienceById: async (id: number): Promise<Experience> => {
    try {
      const response = await api.get(`/${id}`);
      // La API devuelve { message, data }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error obteniendo experiencia por ID:', error);
      throw error;
    }
  },

  // Crear nueva experiencia
  createExperience: async (experienceData: ExperienceFormData): Promise<Experience> => {
    try {
      const response = await api.post('/', experienceData);
      // La API devuelve { message, data }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creando experiencia:', error);
      throw error;
    }
  },

  // Actualizar experiencia
  updateExperience: async (id: number, experienceData: ExperienceFormData): Promise<Experience> => {
    try {
      const response = await api.put(`/${id}`, experienceData);
      // La API devuelve { message, data }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error actualizando experiencia:', error);
      throw error;
    }
  },

  // Eliminar experiencia
  deleteExperience: async (id: number): Promise<void> => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error('Error eliminando experiencia:', error);
      throw error;
    }
  },
}; 