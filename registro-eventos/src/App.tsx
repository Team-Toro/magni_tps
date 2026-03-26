
import React, { useState, useEffect } from 'react';
import { Participante } from './Participante';

const App = () => {
  const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const saved = localStorage.getItem('participantes');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((p: any) => new Participante(
      p.id, p.nombre, p.email, p.edad, p.pais,
      p.modalidad, p.tecnologias, p.nivel, p.aceptaTerminos
    ));
  });

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '' as unknown as number,
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: [] as string[],
    nivel: 'Principiante',
    aceptaTerminos: false
  });

  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroModalidad, setFiltroModalidad] = useState('Todas las modalidades');
  const [filtroNivel, setFiltroNivel] = useState('Todos los niveles');

  useEffect(() => {
    localStorage.setItem('participantes', JSON.stringify(participantes));
  }, [participantes]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'tecnologias') {
        const nuevasTecs = target.checked
          ? [...formData.tecnologias, value]
          : formData.tecnologias.filter(t => t !== value);
        setFormData({ ...formData, tecnologias: nuevasTecs });
      } else {
        setFormData({ ...formData, [name]: target.checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo = new Participante(
      Date.now(),
      formData.nombre,
      formData.email,
      Number(formData.edad),
      formData.pais,
      formData.modalidad,
      formData.tecnologias,
      formData.nivel,
      formData.aceptaTerminos
    );

    setParticipantes([...participantes, nuevo]);

    setFormData({
      nombre: '', email: '', edad: '' as unknown as number,
      pais: 'Argentina', modalidad: 'Presencial',
      tecnologias: [], nivel: 'Principiante', aceptaTerminos: false
    });
  };

  const eliminar = (id: number) => {
    setParticipantes(participantes.filter(p => p.id !== id));
  };

  const coloresNivel: Record<string, string> = {
    Principiante: 'bg-green-100 border-green-500 text-green-900',
    Intermedio: 'bg-yellow-100 border-yellow-500 text-yellow-900',
    Avanzado: 'bg-red-100 border-red-500 text-red-900',
  };

  const filtrados = participantes.filter(p => {
    const cumpleNombre = p.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const cumpleModalidad = filtroModalidad === 'Todas las modalidades' || p.modalidad === filtroModalidad;
    const cumpleNivel = filtroNivel === 'Todos los niveles' || p.nivel === filtroNivel;
    return cumpleNombre && cumpleModalidad && cumpleNivel;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-6">

        {/* Encabezado */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg shadow-md">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Registro de Participantes</h1>
        </div>

        <div className="bg-white p-6 shadow-md rounded-b-lg mb-8 border-x border-b">
          {/* Contador de participantes */}
          <p className="text-gray-700 mb-6 font-semibold italic">
            Participantes registrados: {participantes.length}
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

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            placeholder="🔍 Buscar por nombre..."
            className="border p-3 rounded shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
          <select className="border p-3 rounded shadow-sm bg-white" onChange={(e) => setFiltroModalidad(e.target.value)}>
            <option>Todas las modalidades</option>
            <option>Presencial</option>
            <option>Virtual</option>
            <option>Híbrido</option>
          </select>
          <select className="border p-3 rounded shadow-sm bg-white" onChange={(e) => setFiltroNivel(e.target.value)}>
            <option>Todos los niveles</option>
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </div>

        {/* Grilla de participantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map(p => (
            <div
              key={p.id}
              className={`p-5 rounded-lg shadow-md border-t-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${coloresNivel[p.nivel] || 'bg-white border-gray-300'}`}
            >
              <div>
                <div className="flex justify-between items-start border-b border-black/10 pb-2 mb-3">
                  <h3 className="font-extrabold text-xl truncate">{p.nombre}</h3>
                  <span className="text-xs font-black uppercase opacity-60 tracking-tighter">{p.nivel}</span>
                </div>
                <p className="text-sm font-bold mb-1">📍 {p.pais}</p>
                <div className="space-y-1 text-sm">
                  <p><strong>Modalidad:</strong> {p.modalidad}</p>
                  <p><strong>Edad:</strong> {p.edad} años</p>

                  {/* Etiqueta "Perfil Avanzado" en rojo solo si el nivel es Avanzado */}
                  {p.nivel === 'Avanzado' && (
                    <p className="text-red-600 font-bold text-xs mt-1">Perfil Avanzado</p>
                  )}

                  <p className="mt-3 font-semibold text-xs border-t border-black/5 pt-2 italic">
                    {p.tecnologias.join(' • ') || 'Sin tecnologías'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => eliminar(p.id)}
                className="mt-5 bg-red-600 text-white px-4 py-2 rounded text-xs font-black hover:bg-red-700 transition-colors uppercase tracking-widest shadow-sm self-end"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 font-medium italic">No se encontraron participantes que coincidan con los filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
