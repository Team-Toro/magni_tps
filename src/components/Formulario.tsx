import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Participante } from '../models/Participante';
import { useParticipantes } from '../context/useParticipantes';

export const Formulario = () => {
  const { agregar } = useParticipantes();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    pais: 'Argentina',
    modalidad: 'Presencial' as const,
    tecnologias: [] as string[],
    nivel: 'Principiante' as const,
    aceptaTerminos: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && name === 'tecnologias') {
      const target = e.target as HTMLInputElement;
      const nuevasTecs = target.checked 
        ? [...formData.tecnologias, value]
        : formData.tecnologias.filter(t => t !== value);
      setFormData({ ...formData, tecnologias: nuevasTecs });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaTerminos) return alert("Debes aceptar los términos");
    
    agregar({ 
      ...formData, 
      edad: Number(formData.edad),
      tecnologias: formData.tecnologias 
    } as Omit<Participante, 'id'>);

    setFormData({
      nombre: '', 
      email: '', 
      edad: '', 
      pais: 'Argentina',
      modalidad: 'Presencial', 
      tecnologias: [], 
      nivel: 'Principiante', 
      aceptaTerminos: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Nombre */}
        <input 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          type="text" 
          placeholder="Nombre" 
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400" 
          required 
        />

        {/* Email */}
        <input 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          type="email" 
          placeholder="Email" 
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400" 
          required 
        />
        
        {/* Edad */}
        <input 
          name="edad" 
          value={formData.edad} 
          onChange={handleChange} 
          type="number" 
          placeholder="Edad" 
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-400" 
          required 
        />
        
        {/* País */}
        <select 
          name="pais" 
          value={formData.pais} 
          onChange={handleChange} 
          className="border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400"
        >
          {['Argentina', 'Chile', 'Brasil', 'México', 'Uruguay'].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Modalidad */}
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
                  onChange={handleChange} 
                  className="accent-blue-600"
                /> {m}
              </label>
            ))}
          </div>
        </div>

        {/* Tecnologías */}
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
                  onChange={handleChange} 
                  className="accent-blue-600"
                /> {tech}
              </label>
            ))}
          </div>
        </div>

        {/* Nivel */}
        <select 
          name="nivel" 
          value={formData.nivel} 
          onChange={handleChange} 
          className="md:col-span-2 border border-gray-300 p-2 rounded bg-white outline-none focus:border-blue-400"
        >
          {['Principiante', 'Intermedio', 'Avanzado'].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {/* Términos */}
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input 
            type="checkbox" 
            name="aceptaTerminos" 
            checked={formData.aceptaTerminos} 
            onChange={handleChange} 
            className="accent-blue-600"
            required 
          /> Acepto términos
        </label>
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded shadow-sm transition-all active:scale-95"
      >
        Registrar
      </button>
    </form>
  );
};