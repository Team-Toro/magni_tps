import { useReducer, useEffect, type ReactNode } from 'react';
import { ParticipantesContext } from './ParticipantesContext';
import { participantesReducer } from '../reducers/participantesReducer';
import type { Participante } from '../models/Participante';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const API_URL = `${API_BASE_URL.replace(/\/$/, '')}/participantes`;

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [participantes, dispatch] = useReducer(participantesReducer, []);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Participante[]) => dispatch({ type: 'SET', payload: data }))
      .catch(console.error);
  }, []);

  const agregar = async (nuevo: Omit<Participante, 'id'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    const created = await res.json();
    dispatch({ type: 'AGREGAR', payload: created });
  };

  const eliminar = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    dispatch({ type: 'ELIMINAR', payload: id });
  };

  const resetear = async () => {
    for (const p of participantes) {
      await fetch(`${API_URL}/${p.id}`, { method: 'DELETE' });
    }
    dispatch({ type: 'RESET', payload: [] });
  };

  const editar = async (actualizado: Participante) => {
    const res = await fetch(`${API_URL}/${actualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actualizado),
    });
    const updated = await res.json();
    dispatch({ type: 'EDITAR', payload: updated });
  };

  return (
    <ParticipantesContext.Provider value={{ participantes, agregar, eliminar, resetear, editar }}>
      {children}
    </ParticipantesContext.Provider>
  );
}
