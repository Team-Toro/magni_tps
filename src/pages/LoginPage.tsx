import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useLoginHelp } from '../hooks/useLoginHelp';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginHelp = useLoginHelp();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const ok = await login(username.trim(), password);
    setIsSubmitting(false);

    if (!ok) {
      setError('Credenciales invalidas');
      loginHelp.onFailedLogin();
      return;
    }

    navigate('/lista', { replace: true });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/lista', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-700"
      >
        <h2 className="text-lg font-semibold text-gray-800 text-center dark:text-slate-100">
          Iniciar Sesion - Registro de Participantes
        </h2>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
            required
            autoComplete="current-password"
          />
        </div>
        {error ? (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Login'}
        </button>
      </form>
      {loginHelp.isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg border border-gray-200 dark:bg-slate-900 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
              Datos de acceso
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
              Usa estas credenciales de prueba:
            </p>
            <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-slate-200">
              <div className="rounded-md border border-gray-200 p-3 dark:border-slate-700">
                <p className="font-semibold">Admin</p>
                <p>Usuario: <span className="font-mono">admin</span></p>
                <p>Password: <span className="font-mono">Admin1234!</span></p>
              </div>
              <div className="rounded-md border border-gray-200 p-3 dark:border-slate-700">
                <p className="font-semibold">Consulta</p>
                <p>Usuario: <span className="font-mono">juan</span></p>
                <p>Password: <span className="font-mono">Juan1234!</span></p>
              </div>
            </div>
            <button
              type="button"
              onClick={loginHelp.close}
              className="mt-6 w-full rounded-md bg-gray-800 text-white py-2 font-medium hover:bg-gray-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
