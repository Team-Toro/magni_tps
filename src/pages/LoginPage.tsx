import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const ok = await login(username.trim(), password);
    setIsSubmitting(false);

    if (!ok) {
      setError('Credenciales invalidas');
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
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Iniciar Sesion - Registro de Participantes
        </h2>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400"
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-400"
            required
            autoComplete="current-password"
          />
        </div>
        {error ? (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        ) : null}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
