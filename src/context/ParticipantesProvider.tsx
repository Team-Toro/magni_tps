import { useReducer, useEffect, useState, type ReactNode } from 'react';
import { ParticipantesContext } from './ParticipantesContext';
import { participantesReducer } from '../reducers/participantesReducer';
import type { Participante } from '../models/Participante';

const API_URL = 'http://localhost:3001/participantes';

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [participantes, dispatch] = useReducer(participantesReducer, []);
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState<Participante | null>(null);

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

  const seleccionar = (p: Participante | null) => {
    setParticipanteSeleccionado(p);
  };

  return (
    <ParticipantesContext.Provider value={{
      participantes,
      agregar,
      eliminar,
      resetear,
      editar,
      participanteSeleccionado,
      seleccionar,
    }}>
      {children}
    </ParticipantesContext.Provider>
  );
}
