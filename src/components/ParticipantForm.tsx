import React from 'react';

interface ParticipantFormProps {
  formData: {
    nombre: string;
    email: string;
    edad: number;
    pais: string;
    modalidad: string;
    tecnologias: string[];
    nivel: string;
    aceptaTerminos: boolean;
  };
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  registrar: (e: React.FormEvent) => void;
  participantesCount: number;
  filtradosCount: number;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  formData,
  manejarCambio,
  registrar,
  participantesCount,
  filtradosCount
}) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-b-lg mb-8 border-x border-b">
      {/* TP3: contador dinamico */}
      <p className="text-gray-700 mb-6 font-semibold italic">
        Mostrando {filtradosCount} de {participantesCount} participantes
      </p>

      <form onSubmit={registrar} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={manejarCambio} className="border p-2 rounded w-full focus:ring-2 focus:ring-green-400 outline-none" required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={manejarCambio} className="border p-2 rounded w-full focus:ring-2 focus:ring-green-400 outline-none" required />
          <input name="edad" type="number" placeholder="Edad" value={formData.edad} onChange={manejarCambio} className="border p-2 rounded w-full focus:ring-2 focus:ring-green-400 outline-none" required />
          <select name="pais" value={formData.pais} onChange={manejarCambio} className="border p-2 rounded w-full bg-white">
            <option>Argentina</option>
            <option>Chile</option>
            <option>Uruguay</option>
            <option>México</option>
            <option>España</option>
          </select>
        </div>

        <div className="bg-gray-50 p-3 rounded border">
          <p className="font-bold text-sm mb-2 text-gray-600">MODALIDAD DE ASISTENCIA</p>
          <div className="flex gap-6">
            {['Presencial', 'Virtual', 'Híbrido'].map(mod => (
              <label key={mod} className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors">
                <input type="radio" name="modalidad" value={mod} checked={formData.modalidad === mod} onChange={manejarCambio} className="w-4 h-4 text-green-600" /> {mod}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded border">
          <p className="font-bold text-sm mb-2 text-gray-600">TECNOLOGÍAS CONOCIDAS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map(tec => (
              <label key={tec} className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors">
                <input type="checkbox" name="tecnologias" value={tec} checked={formData.tecnologias.includes(tec)} onChange={manejarCambio} className="w-4 h-4 rounded text-green-600" /> {tec}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <select name="nivel" value={formData.nivel} onChange={manejarCambio} className="border p-2 rounded w-full bg-white font-medium">
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
            <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={manejarCambio} required className="w-5 h-5" />
            Acepto los términos y condiciones
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-wide shadow"
        >
          Registrar Participante
        </button>
      </form>
    </div>
  );
};

export default ParticipantForm;
