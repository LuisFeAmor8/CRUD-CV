export interface Experience {
  id?: number;
  empresa: string;
  cargo: string;
  fecha_inicio: string;
  fecha_fin: string;
  descripcion: string;
  tecnologias: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceFormData {
  empresa: string;
  cargo: string;
  fecha_inicio: string;
  fecha_fin: string;
  descripcion: string;
  tecnologias: string;
} 