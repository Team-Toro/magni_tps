import React from 'react';
import { Participante } from '../models/Participante';
import { coloresNivel } from '../utils/constants';

interface ParticipantCardProps {
  participante: Participante;
  eliminar: (id: number) => void;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participante, eliminar }) => {
  return (
    <div
      className={`p-5 rounded-lg shadow-md border-t-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${coloresNivel[participante.nivel] || 'bg-white border-gray-300'}`}
    >
      <div>
        <div className="flex justify-between items-start border-b border-black/10 pb-2 mb-3">
          <h3 className="font-extrabold text-xl truncate">{participante.nombre}</h3>
          <span className="text-xs font-black uppercase opacity-60 tracking-tighter">{participante.nivel}</span>
        </div>
        <p className="text-sm font-bold mb-1">{participante.pais}</p>
        <div className="space-y-1 text-sm">
          <p><strong>Modalidad:</strong> {participante.modalidad}</p>
          <p><strong>Edad:</strong> {participante.edad} años</p>

          {participante.nivel === 'Avanzado' && (
            <p className="text-red-600 font-bold text-xs mt-1">Perfil Avanzado</p>
          )}

          <p className="mt-3 font-semibold text-xs border-t border-black/5 pt-2 italic">
            {participante.tecnologias.join(' • ') || 'Sin tecnologias'}
          </p>
        </div>
      </div>

      <button
        onClick={() => eliminar(participante.id)}
        className="mt-5 bg-red-600 text-white px-4 py-2 rounded text-xs font-black hover:bg-red-700 transition-colors uppercase tracking-widest shadow-sm self-end"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ParticipantCard;
