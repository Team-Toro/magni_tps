export interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: 'Presencial' | 'Virtual' | 'Híbrido';
  tecnologias: string[];
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  aceptaTerminos: boolean;
}