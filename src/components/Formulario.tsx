import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
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
  nombreInputRef,
}: {
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nombreInputRef: React.RefObject<HTMLInputElement>;
}) {
  const nombreId = useId();
  const emailId = useId();
  const edadId = useId();
  const paisId = useId();
  const nivelId = useId();
  const modalidadGroupId = useId();
  const tecnologiasGroupId = useId();
  const terminosId = useId();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor={nombreId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
          Nombre
        </label>
        <input
          ref={nombreInputRef}
          id={nombreId}
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          type="text"
          placeholder="Nombre"
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={emailId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          value={formData.email}
          onChange={onChange}
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={edadId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
          Edad
        </label>
        <input
          id={edadId}
          name="edad"
          value={formData.edad}
          onChange={onChange}
          type="number"
          placeholder="Edad"
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={paisId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
          Pais
        </label>
        <select
          id={paisId}
          name="pais"
          value={formData.pais}
          onChange={onChange}
          className="border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          {['Argentina', 'Chile', 'Brasil', 'México', 'Uruguay'].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <fieldset className="md:col-span-2">
        <legend className="font-bold text-sm mb-1 text-gray-700 dark:text-slate-200">Modalidad</legend>
        <div className="flex gap-4">
          {['Presencial', 'Virtual', 'Híbrido'].map((m, index) => {
            const modalidadId = `${modalidadGroupId}-${index}`;
            return (
              <div key={m} className="flex items-center gap-1 text-sm">
                <input
                  id={modalidadId}
                  type="radio"
                  name="modalidad"
                  value={m}
                  checked={formData.modalidad === m}
                  onChange={onChange}
                  className="accent-blue-600"
                />
                <label htmlFor={modalidadId} className="cursor-pointer dark:text-slate-200">
                  {m}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="md:col-span-2">
        <legend className="font-bold text-sm mb-1 text-gray-700 dark:text-slate-200">Tecnologias</legend>
        <div className="grid grid-cols-3 gap-2">
          {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map((tech, index) => {
            const tecnologiaId = `${tecnologiasGroupId}-${index}`;
            return (
              <div key={tech} className="flex items-center gap-2 text-sm">
                <input
                  id={tecnologiaId}
                  type="checkbox"
                  name="tecnologias"
                  value={tech}
                  checked={formData.tecnologias.includes(tech)}
                  onChange={onChange}
                  className="accent-blue-600"
                />
                <label htmlFor={tecnologiaId} className="cursor-pointer dark:text-slate-200">
                  {tech}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="md:col-span-2 flex flex-col gap-1">
        <label htmlFor={nivelId} className="text-sm font-medium text-gray-700 dark:text-slate-200">
          Nivel
        </label>
        <select
          id={nivelId}
          name="nivel"
          value={formData.nivel}
          onChange={onChange}
          className="border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
        >
          {['Principiante', 'Intermedio', 'Avanzado'].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2 flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
        <input
          id={terminosId}
          type="checkbox"
          name="aceptaTerminos"
          checked={formData.aceptaTerminos}
          onChange={onChange}
          className="accent-blue-600"
          required
        />
        <label htmlFor={terminosId} className="cursor-pointer">
          Acepto terminos
        </label>
      </div>
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
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(getInitialData(participanteSeleccionado));
  }, [participanteSeleccionado]);

  useEffect(() => {
    nombreInputRef.current?.focus();
  }, []);

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-8 dark:bg-slate-900 dark:border-slate-700">
      <FormularioFields
        formData={formData}
        onChange={handleChange}
        nombreInputRef={nombreInputRef}
      />
      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded shadow-sm transition-all active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {participanteSeleccionado ? 'Actualizar' : 'Registrar'}
      </button>
    </form>
  );
}
