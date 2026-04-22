import React from 'react';
import { useParticipants } from './hooks/useParticipants';
import ParticipantForm from './components/ParticipantForm';
import ParticipantFilters from './components/ParticipantFilters';
import ParticipantList from './components/ParticipantList';

const App: React.FC = () => {
  const {
    participantes,
    formData,
    filtros,
    filtrados,
    manejarCambio,
    registrar,
    eliminar,
    limpiarFiltros,
    resetearDatos
  } = useParticipants();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-6">

        {/* TP3: encabezado */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Registro de Participantes</h1>
        </div>

        {/* TP3: formulario */}
        <ParticipantForm
          formData={formData}
          manejarCambio={manejarCambio}
          registrar={registrar}
          participantesCount={participantes.length}
          filtradosCount={filtrados.length}
        />

        {/* TP3: contador dinamico */}
        <div>
          <p className="text-gray-700 mb-6 font-semibold italic">
            Mostrando {filtrados.length} de {participantes.length} participantes
          </p>
        </div>

        {/* TP3: filtros combinados */}
        <ParticipantFilters filtros={filtros} limpiarFiltros={limpiarFiltros} />

        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={resetearDatos}
            className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition-colors"
          >
            Resetear datos
          </button>
        </div>

        {/* TP3: tarjetas */}
        <ParticipantList participantes={filtrados} eliminar={eliminar} />

      </div>
    </div>
  );
};

export default App;
