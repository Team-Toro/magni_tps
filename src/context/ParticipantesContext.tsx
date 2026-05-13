import { createContext } from 'react';
import type { Participante } from '../models/Participante';

interface ContextType {
  participantes: Participante[];
  agregar: (p: Omit<Participante, 'id'>) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  resetear: () => Promise<void>;
  editar: (p: Participante) => Promise<void>;
  refresh: () => Promise<void>;
  participanteSeleccionado: Participante | null;
  seleccionar: (p: Participante | null) => void;
}

export const ParticipantesContext = createContext<ContextType | undefined>(undefined);
