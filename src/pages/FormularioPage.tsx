import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { useParticipantes } from "../context/useParticipantes";

export default function FormularioPage() {
  const navigate = useNavigate();
  const { seleccionar } = useParticipantes();

  useEffect(() => {
    seleccionar(null);
  }, [seleccionar]);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Nuevo Participante
      </h1>
      <Formulario onSuccess={() => navigate("/")} />
    </div>
  );
}
