import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu';
import ListaPage from './pages/ListaPage';
import FormularioPage from './pages/FormularioPage';
import EditarPage from './pages/EditarPage';
import LoginPage from './pages/LoginPage';
import PublicaPage from './pages/PublicaPage';
import CursosPage from './pages/CursosPage';
import PrivateRoute from './routes/PrivateRoute';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useKeyboardShortcut(
    {
      key: 'f2',
      code: 'F2',
      preventDefault: true,
      allowInInput: false,
    },
    toggleTheme,
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      <HamburgerMenu
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        onClose={closeMenu}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/publica" element={<PublicaPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route
          path="/lista"
          element={
            <PrivateRoute>
              <ListaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/nuevo"
          element={
            <PrivateRoute rol="ADMIN">
              <FormularioPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute rol="ADMIN">
              <EditarPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
