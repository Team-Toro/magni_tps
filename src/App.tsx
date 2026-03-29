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
    eliminar
  } = useParticipants();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-6">

        {/* Encabezado */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Registro de Participantes</h1>
        </div>

        {/* Formulario de registro */}
        <ParticipantForm 
          formData={formData} 
          manejarCambio={manejarCambio} 
          registrar={registrar} 
          participantesCount={participantes.length} 
        />

        {/* Filtros de búsqueda */}
        <ParticipantFilters filtros={filtros} />

        {/* Lista de participantes */}
        <ParticipantList participantes={filtrados} eliminar={eliminar} />

      </div>
    </div>
  );
};

export default App;
