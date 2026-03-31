import React from 'react';
import { Participante } from '../types/Participante';
import { coloresNivel } from '../utils/constants';

interface ParticipantListProps {
  participantes: Participante[];
  eliminar: (id: number) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participantes, eliminar }) => {
  if (participantes.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 font-medium italic">No se encontraron participantes que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {participantes.map(p => (
        <div
          key={p.id}
          className={`p-5 rounded-lg shadow-md border-t-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${coloresNivel[p.nivel] || 'bg-white border-gray-300'}`}
        >
          <div>
            <div className="flex justify-between items-start border-b border-black/10 pb-2 mb-3">
              <h3 className="font-extrabold text-xl truncate">{p.nombre}</h3>
              <span className="text-xs font-black uppercase opacity-60 tracking-tighter">{p.nivel}</span>
            </div>
            <p className="text-sm font-bold mb-1">📍 {p.pais}</p>
            <div className="space-y-1 text-sm">
              <p><strong>Modalidad:</strong> {p.modalidad}</p>
              <p><strong>Edad:</strong> {p.edad} años</p>

              {/* Etiqueta "Perfil Avanzado" en rojo solo si el nivel es Avanzado */}
              {p.nivel === 'Avanzado' && (
                <p className="text-red-600 font-bold text-xs mt-1">Perfil Avanzado</p>
              )}

              <p className="mt-3 font-semibold text-xs border-t border-black/5 pt-2 italic">
                {p.tecnologias.join(' • ') || 'Sin tecnologías'}
              </p>
            </div>
          </div>

          <button
            onClick={() => eliminar(p.id)}
            className="mt-5 bg-red-600 text-white px-4 py-2 rounded text-xs font-black hover:bg-red-700 transition-colors uppercase tracking-widest shadow-sm self-end"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
