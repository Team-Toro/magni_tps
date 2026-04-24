import { useState } from 'react';
import { Formulario } from './components/Formulario';
import { Filtros } from './components/Filtros';
import { ParticipanteCard } from './components/ParticipanteCard';
import { useParticipantes } from './context/useParticipantes'

export function Home() {
  const { participantes, resetear } = useParticipantes();
  const [filtro, setFiltro] = useState('');
  const [filtroMod, setFiltroMod] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  const limpiarFiltros = () => {
    setFiltro('');
    setFiltroMod('Todas');
    setFiltroNivel('Todos');
  };

  const filtrados = participantes.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(filtro.toLowerCase());
    const coincideMod = filtroMod === 'Todas' || p.modalidad === filtroMod;
    const coincideNivel = filtroNivel === 'Todos' || p.nivel === filtroNivel;
    return coincideNombre && coincideMod && coincideNivel;
  });

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <div className="bg-emerald-500 text-white p-3 font-bold text-lg px-6 mb-4 flex justify-between items-center">
        Registro de Participantes - TP4
        <button onClick={resetear} className="text-xs bg-emerald-700 hover:bg-emerald-800 p-2 rounded">
          Resetear datos
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <p className="mb-4 font-bold text-gray-700">
          Mostrando {filtrados.length} de {participantes.length} participantes
        </p>
        
        <Formulario />

        <Filtros 
          filtro={filtro} setFiltro={setFiltro}
          filtroMod={filtroMod} setFiltroMod={setFiltroMod}
          filtroNivel={filtroNivel} setFiltroNivel={setFiltroNivel}
          onLimpiar={limpiarFiltros}
        />

        {filtrados.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500 text-xl font-medium">No hay participantes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtrados.map(p => (
              <ParticipanteCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}