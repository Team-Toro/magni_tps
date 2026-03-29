import { useState, useEffect } from 'react';
import { Participante } from '../types/Participante';

export const useParticipants = () => {
  const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const saved = localStorage.getItem('participantes');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((p: any) => new Participante(
        p.id, p.nombre, p.email, p.edad, p.pais,
        p.modalidad, p.tecnologias, p.nivel, p.aceptaTerminos
      ));
    } catch (e) {
      console.error("Error parsing participantes from localStorage", e);
      return [];
    }
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

  const filtrados = participantes.filter(p => {
    const cumpleNombre = p.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const cumpleModalidad = filtroModalidad === 'Todas las modalidades' || p.modalidad === filtroModalidad;
    const cumpleNivel = filtroNivel === 'Todos los niveles' || p.nivel === filtroNivel;
    return cumpleNombre && cumpleModalidad && cumpleNivel;
  });

  return {
    participantes,
    formData,
    filtros: {
      filtroNombre,
      filtroModalidad,
      filtroNivel,
      setFiltroNombre,
      setFiltroModalidad,
      setFiltroNivel
    },
    filtrados,
    manejarCambio,
    registrar,
    eliminar
  };
};
