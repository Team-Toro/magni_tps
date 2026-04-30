import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParticipantes } from '../context/useParticipantes';
import type { Participante } from '../models/Participante';

interface FormularioProps {
  onSuccess?: () => void;
}

type FormData = {
  nombre: string;
  email: string;
  edad: string;
  pais: string;
  modalidad: Participante['modalidad'];
  tecnologias: string[];
  nivel: Participante['nivel'];
  aceptaTerminos: boolean;
};

function getInitialData(participante: Participante | null): FormData {
  if (participante) {
    return {
      nombre: participante.nombre,
      email: participante.email,
      edad: String(participante.edad),
      pais: participante.pais,
      modalidad: participante.modalidad,
      tecnologias: [...participante.tecnologias],
      nivel: participante.nivel,
      aceptaTerminos: participante.aceptaTerminos,
    };
  }
  return {
    nombre: '',
    email: '',
    edad: '',
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: [],
    nivel: 'Principiante',
    aceptaTerminos: false,
  };
}

function FormularioFields({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="nombre"
        value={formData.nombre}
        onChange={onChange}
        type="text"
        placeholder="Nombre"
        className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400"
        required
      />

      <input
        name="email"
        value={formData.email}
        onChange={onChange}
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400"
        required
      />

      <input
        name="edad"
        value={formData.edad}
        onChange={onChange}
        type="number"
        placeholder="Edad"
        className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400"
        required
      />

      <select
        name="pais"
        value={formData.pais}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400"
      >
        {['Argentina', 'Chile', 'Brasil', 'México', 'Uruguay'].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <div className="md:col-span-2">
        <p className="font-bold text-sm mb-1 text-gray-700">Modalidad</p>
        <div className="flex gap-4">
          {['Presencial', 'Virtual', 'Híbrido'].map(m => (
            <label key={m} className="flex items-center gap-1 text-sm cursor-pointer">
              <input
                type="radio"
                name="modalidad"
                value={m}
                checked={formData.modalidad === m}
                onChange={onChange}
                className="accent-blue-600"
              /> {m}
            </label>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <p className="font-bold text-sm mb-1 text-gray-700">Tecnologías</p>
        <div className="grid grid-cols-3 gap-2">
          {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map(tech => (
            <label key={tech} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="tecnologias"
                value={tech}
                checked={formData.tecnologias.includes(tech)}
                onChange={onChange}
                className="accent-blue-600"
              /> {tech}
            </label>
          ))}
        </div>
      </div>

      <select
        name="nivel"
        value={formData.nivel}
        onChange={onChange}
        className="md:col-span-2 border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400"
      >
        {['Principiante', 'Intermedio', 'Avanzado'].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          name="aceptaTerminos"
          checked={formData.aceptaTerminos}
          onChange={onChange}
          className="accent-blue-600"
          required
        /> Acepto términos
      </label>
    </div>
  );
}

export default function Formulario({ onSuccess }: FormularioProps) {
  const {
    agregar,
    editar,
    participanteSeleccionado,
    seleccionar,
  } = useParticipantes();
  const [formData, setFormData] = useState(() => getInitialData(participanteSeleccionado));

  useEffect(() => {
    setFormData(getInitialData(participanteSeleccionado));
  }, [participanteSeleccionado]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && name === 'tecnologias') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        tecnologias: target.checked
          ? [...prev.tecnologias, value]
          : prev.tecnologias.filter(t => t !== value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) {
      return alert('Debes aceptar los términos');
    }

    const data = {
      ...formData,
      edad: Number(formData.edad),
      tecnologias: formData.tecnologias,
    };

    if (participanteSeleccionado) {
      editar({ ...data, id: participanteSeleccionado.id });
      seleccionar(null);
    } else {
      agregar(data as Omit<Participante, 'id'>);
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-8">
      <FormularioFields formData={formData} onChange={handleChange} />
      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded shadow-sm transition-all active:scale-95"
      >
        {participanteSeleccionado ? 'Actualizar' : 'Registrar'}
      </button>
    </form>
  );
}
