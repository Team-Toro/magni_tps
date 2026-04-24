import type { Participante } from '../models/Participante';
import { useParticipantes } from '../context/useParticipantes';

interface CardProps {
  p: Participante;
  onEditar: (p: Participante) => void;
}

export const ParticipanteCard = ({ p, onEditar }: CardProps) => {
  const { eliminar } = useParticipantes();
  
  const styles = 
    p.nivel === 'Principiante' ? { bg: 'bg-green-50', text: 'text-green-600' } :
    p.nivel === 'Intermedio' ? { bg: 'bg-yellow-50', text: 'text-yellow-600' } : 
    { bg: 'bg-red-50', text: 'text-red-600' };

  return (
    <div className={`${styles.bg} border border-gray-200 p-5 rounded relative flex flex-col gap-1 shadow-sm`}>
      <h3 className="text-lg font-bold">{p.nombre}</h3>
      <p className="text-gray-700">{p.pais}</p>
      <div className="mt-2 text-sm">
        <p className="text-gray-800">Modalidad: {p.modalidad}</p>
        <p className={`font-bold ${styles.text}`}>Nivel: {p.nivel}</p>
        {p.nivel === 'Avanzado' ? (
           <div className="mt-2">
             <p className="font-bold text-gray-800">{p.tecnologias[0]}</p>
             <p className="font-bold text-red-500">Perfil Avanzado</p>
           </div>
        ) : (
          <p className="mt-1 font-medium text-gray-700">{p.tecnologias.join(' - ')}</p>
        )}
      </div>
      <button 
        onClick={() => onEditar(p)}
        className="mt-4 bg-blue-500 text-white text-sm py-1.5 px-4 rounded hover:bg-blue-600 transition w-fit"
      >
        Editar
      </button>
      <button 
        onClick={() => eliminar(p.id)}
        className="mt-4 bg-red-500 text-white text-sm py-1.5 px-4 rounded hover:bg-red-600 transition w-fit"
      >
        Eliminar
      </button>
    </div>
  );
};