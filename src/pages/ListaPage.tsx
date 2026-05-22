import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useParticipantes } from "../context/useParticipantes";
import ParticipanteCard from "../components/ParticipanteCard";
import { useAuth } from "../context/useAuth";
import { Filtros } from "../components/Filtros";

export default function Lista() {
  const { participantes } = useParticipantes();
  const { user } = useAuth();
  const [filtro, setFiltro] = useState('');
  const [filtroMod, setFiltroMod] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const filtroInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/') {
        return;
      }

      const activeElement = document.activeElement as HTMLElement | null;
      const isTypingTarget = !!activeElement && (
        activeElement.tagName === 'INPUT'
        || activeElement.tagName === 'TEXTAREA'
        || activeElement.isContentEditable
      );

      if (isTypingTarget) {
        return;
      }

      event.preventDefault();
      filtroInputRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const filteredParticipantes = useMemo(() => {
    const normalizedFilter = filtro.trim().toLowerCase();
    return participantes.filter(participante => {
      const matchesNombre = normalizedFilter
        ? participante.nombre.toLowerCase().includes(normalizedFilter)
        : true;
      const matchesModalidad = filtroMod === 'Todas'
        ? true
        : participante.modalidad === filtroMod;
      const matchesNivel = filtroNivel === 'Todos'
        ? true
        : participante.nivel === filtroNivel;
      return matchesNombre && matchesModalidad && matchesNivel;
    });
  }, [participantes, filtro, filtroMod, filtroNivel]);

  const handleLimpiarFiltros = () => {
    setFiltro('');
    setFiltroMod('Todas');
    setFiltroNivel('Todos');
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Participantes
      </h1>
      {user?.rol === 'ADMIN' ? (
        <Link
          to="/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
        >
          Nuevo participante
        </Link>
      ) : null}
      <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
        filtroMod={filtroMod}
        setFiltroMod={setFiltroMod}
        filtroNivel={filtroNivel}
        setFiltroNivel={setFiltroNivel}
        onLimpiar={handleLimpiarFiltros}
        nombreInputRef={filtroInputRef}
      />
      {filteredParticipantes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg mt-4 dark:bg-slate-900 dark:border-slate-700">
          <p className="text-gray-500 text-xl font-medium dark:text-slate-300">No se encontraron participantes</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {filteredParticipantes.map(p => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      )}
    </div>
  );
}
