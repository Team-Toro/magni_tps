import { useState, useEffect, type ReactNode } from 'react';
import { ParticipantesContext } from './ParticipantesContext';
import type { Participante } from '../models/Participante';

const API_URL = 'http://localhost:3001/participantes';

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setParticipantes(data))
      .catch(console.error);
  }, []);

  const agregar = async (nuevo: Omit<Participante, 'id'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    const created = await res.json();
    setParticipantes(prev => [...prev, created]);
  };

  const eliminar = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setParticipantes(prev => prev.filter(p => p.id !== id));
  };

  const resetear = async () => {
    for (const p of participantes) {
      await fetch(`${API_URL}/${p.id}`, { method: 'DELETE' });
    }
    setParticipantes([]);
  };

  return (
    <ParticipantesContext.Provider value={{ participantes, agregar, eliminar, resetear }}>
      {children}
    </ParticipantesContext.Provider>
  );
}