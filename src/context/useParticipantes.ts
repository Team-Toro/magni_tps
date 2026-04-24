import { useContext } from 'react';
import { ParticipantesContext } from './ParticipantesContext';

export function useParticipantes() {
  const context = useContext(ParticipantesContext);
  if (!context) {
    throw new Error('useParticipantes must be used within ParticipantesProvider');
  }
  return context;
}