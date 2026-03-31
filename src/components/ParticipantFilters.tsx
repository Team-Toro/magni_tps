import React from 'react';

interface ParticipantFiltersProps {
  filtros: {
    filtroNombre: string;
    filtroModalidad: string;
    filtroNivel: string;
    setFiltroNombre: (val: string) => void;
    setFiltroModalidad: (val: string) => void;
    setFiltroNivel: (val: string) => void;
  };
}

const ParticipantFilters: React.FC<ParticipantFiltersProps> = ({ filtros }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <input
        placeholder="🔍 Buscar por nombre..."
        value={filtros.filtroNombre}
        className="border p-3 rounded shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        onChange={(e) => filtros.setFiltroNombre(e.target.value)}
      />
      <select 
        className="border p-3 rounded shadow-sm bg-white" 
        value={filtros.filtroModalidad}
        onChange={(e) => filtros.setFiltroModalidad(e.target.value)}
      >
        <option>Todas las modalidades</option>
        <option>Presencial</option>
        <option>Virtual</option>
        <option>Híbrido</option>
      </select>
      <select 
        className="border p-3 rounded shadow-sm bg-white" 
        value={filtros.filtroNivel}
        onChange={(e) => filtros.setFiltroNivel(e.target.value)}
      >
        <option>Todos los niveles</option>
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>
    </div>
  );
};

export default ParticipantFilters;
