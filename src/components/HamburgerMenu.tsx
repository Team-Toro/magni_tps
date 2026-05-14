import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

type HamburgerMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function HamburgerMenu({ isOpen, onToggle, onClose }: HamburgerMenuProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <header className="relative z-50 border-b border-gray-200 bg-emerald-100">
        <div className="relative flex h-14 items-center px-2">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls="main-menu"
            aria-label="Abrir menú"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded hover:bg-gray-100"
          >
            <span className="sr-only">Abrir menú</span>
            <span className="block h-0.5 w-6 bg-gray-800" />
            <span className="block h-0.5 w-6 bg-gray-800" />
            <span className="block h-0.5 w-6 bg-gray-800" />
          </button>
          <h1 className="pointer-events-none absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800">
            TP Nº7
          </h1>
        </div>
      </header>

      {isOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 bg-black/40"
          onClick={onClose}
        />
      ) : null}

      <div
        id="main-menu"
        role="menu"
        className={
          `fixed left-0 top-14 bottom-0 z-50 w-full bg-white shadow-lg transition-transform duration-200 ease-out md:w-60 ${
            isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
          }`
        }
        onClick={(event) => event.stopPropagation()}
      >
        <nav className="p-4">
          <Link
            to="/publica"
            onClick={onClose}
            className="block rounded px-3 py-2 text-gray-800 hover:bg-gray-100"
          >
            Publica
          </Link>
          <Link
            to="/lista"
            onClick={onClose}
            className="block rounded px-3 py-2 text-gray-800 hover:bg-gray-100"
          >
            Lista
          </Link>
          {user?.rol === 'ADMIN' ? (
            <Link
              to="/nuevo"
              onClick={onClose}
              className="block rounded px-3 py-2 text-gray-800 hover:bg-gray-100"
            >
              Nuevo
            </Link>
          ) : null}
          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
                navigate('/login', { replace: true });
              }}
              className="mt-4 w-full rounded px-3 py-2 text-white bg-red-600 hover:bg-red-700"
            >
              Cerrar sesion
            </button>
          ) : null}
        </nav>
      </div>
    </>
  );
}
