import { useReducer, useEffect, useState, type ReactNode } from 'react';
import { ParticipantesContext } from './ParticipantesContext';
import { participantesReducer } from '../reducers/participantesReducer';
import type { Participante } from '../models/Participante';
import { useAuth } from './useAuth';

const API_URL = 'http://localhost:3001/participantes';

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [participantes, dispatch] = useReducer(participantesReducer, []);
  const [participanteSeleccionado, setParticipanteSeleccionado] = useState<Participante | null>(null);
  const { token, logout } = useAuth();

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const refresh = async () => {
    if (!token) {
      dispatch({ type: 'SET', payload: [] });
      return;
    }
    const res = await fetch(API_URL, { headers: authHeaders });
    if (res.status === 401) {
      logout();
      dispatch({ type: 'SET', payload: [] });
      return;
    }
    const data = (await res.json()) as Participante[];
    dispatch({ type: 'SET', payload: data });
  };

  useEffect(() => {
    refresh().catch(console.error);
  }, [token]);

  const agregar = async (nuevo: Omit<Participante, 'id'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify(nuevo),
    });
    if (res.status === 401) {
      logout();
      return;
    }
    const created = await res.json();
    dispatch({ type: 'AGREGAR', payload: created });
  };

  const eliminar = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: authHeaders });
    if (res.status === 401) {
      logout();
      return;
    }
    dispatch({ type: 'ELIMINAR', payload: id });
  };

  const resetear = async () => {
    for (const p of participantes) {
      const res = await fetch(`${API_URL}/${p.id}`, { method: 'DELETE', headers: authHeaders });
      if (res.status === 401) {
        logout();
        return;
      }
    }
    dispatch({ type: 'RESET', payload: [] });
  };

  const editar = async (actualizado: Participante) => {
    const res = await fetch(`${API_URL}/${actualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders },
      body: JSON.stringify(actualizado),
    });
    if (res.status === 401) {
      logout();
      return;
    }
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
    refresh,
    participanteSeleccionado,
    seleccionar,
  }}>
      {children}
    </ParticipantesContext.Provider>
  );
}
