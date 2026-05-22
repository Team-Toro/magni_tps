import { useNavigate } from "react-router-dom";
import { useParticipantes } from "../context/useParticipantes";
import type { Participante } from "../models/Participante";
import { useAuth } from "../context/useAuth";

export default function ParticipanteCard({ participante }: {
  participante: Participante;
}) {
  const { eliminar } = useParticipantes();
  const navigate = useNavigate();
  const { user } = useAuth();
  const styles =
    participante.nivel === 'Principiante' ? { bg: 'bg-green-50 dark:bg-emerald-900/30', text: 'text-green-600 dark:text-emerald-300' } :
    participante.nivel === 'Intermedio' ? { bg: 'bg-yellow-50 dark:bg-amber-900/30', text: 'text-yellow-600 dark:text-amber-300' } :
    { bg: 'bg-red-50 dark:bg-rose-900/30', text: 'text-red-600 dark:text-rose-300' };

  return (
    <div className={`${styles.bg} border border-gray-200 p-5 rounded relative flex flex-col gap-1 shadow-sm dark:border-slate-700`}>
      <h3 className="text-lg font-bold dark:text-slate-100">{participante.nombre}</h3>
      <p className="text-gray-700 dark:text-slate-300">{participante.pais}</p>
      <div className="mt-2 text-sm">
        <p className="text-gray-800 dark:text-slate-200">Modalidad: {participante.modalidad}</p>
        <p className={`font-bold ${styles.text}`}>Nivel: {participante.nivel}</p>
        {participante.nivel === 'Avanzado' ? (
          <div className="mt-2">
            <p className="font-bold text-gray-800 dark:text-slate-200">{participante.tecnologias[0]}</p>
            <p className="font-bold text-red-500 dark:text-rose-300">Perfil Avanzado</p>
          </div>
        ) : (
          <p className="mt-1 font-medium text-gray-700 dark:text-slate-300">{participante.tecnologias.join(' - ')}</p>
        )}
      </div>
      {user?.rol === 'ADMIN' ? (
        <>
          <button
            onClick={() => navigate(`/editar/${participante.id}`)}
            className="mt-4 bg-blue-500 text-white text-sm py-1.5 px-4 rounded hover:bg-blue-600 transition w-fit"
          >
            Editar
          </button>
          <button
            onClick={() => eliminar(participante.id)}
            className="mt-4 bg-red-500 text-white text-sm py-1.5 px-4 rounded hover:bg-red-600 transition w-fit"
          >
            Eliminar
          </button>
        </>
      ) : null}
    </div>
  );
}
