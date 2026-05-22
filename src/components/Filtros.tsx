import type { RefObject } from 'react';

interface FiltrosProps {
  filtro: string;
  setFiltro: (val: string) => void;
  filtroMod: string;
  setFiltroMod: (val: string) => void;
  filtroNivel: string;
  setFiltroNivel: (val: string) => void;
  onLimpiar: () => void;
  nombreInputRef?: RefObject<HTMLInputElement>;
}

export const Filtros = ({ 
  filtro, setFiltro, filtroMod, setFiltroMod, filtroNivel, setFiltroNivel, onLimpiar, nombreInputRef 
}: FiltrosProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input 
        ref={nombreInputRef}
        placeholder="Buscar por nombre..." 
        className="flex-1 border border-gray-300 p-2 rounded outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-md" 
        value={filtro} 
        onChange={(e) => setFiltro(e.target.value)} 
      />
      <select 
        className="flex-1 border border-gray-300 p-2 rounded bg-white" 
        value={filtroMod} 
        onChange={(e) => setFiltroMod(e.target.value)}
      >
        <option value="Todas">Todas las modalidades</option>
        <option value="Presencial">Presencial</option>
        <option value="Virtual">Virtual</option>
        <option value="Híbrido">Híbrido</option>
      </select>
      <select 
        className="flex-1 border border-gray-300 p-2 rounded bg-white" 
        value={filtroNivel} 
        onChange={(e) => setFiltroNivel(e.target.value)}
      >
        <option value="Todos">Todos los niveles</option>
        <option value="Principiante">Principiante</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
      </select>
      <button 
        onClick={onLimpiar}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition shadow-sm"
      >
        Limpiar filtros
      </button>
    </div>
  );
};
