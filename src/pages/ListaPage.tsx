import { Link } from "react-router-dom";
import { useParticipantes } from "../context/useParticipantes";
import ParticipanteCard from "../components/ParticipanteCard";

export default function Lista() {
  const { participantes } = useParticipantes();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Participantes
      </h1>
      <Link
        to="/nuevo"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Nuevo participante
      </Link>
      {participantes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg mt-4">
          <p className="text-gray-500 text-xl font-medium">No hay participantes</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {participantes.map(p => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      )}
    </div>
  );
}
