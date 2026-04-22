import React from 'react';
import { Participante } from '../models/Participante';
import ParticipantCard from './ParticipantCard';

interface ParticipantListProps {
  participantes: Participante[];
  eliminar: (id: number) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participantes, eliminar }) => {
  if (participantes.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 font-medium italic">No hay participantes</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {participantes.map(p => (
        <ParticipantCard key={p.id} participante={p} eliminar={eliminar} />
      ))}
    </div>
  );
};

export default ParticipantList;
