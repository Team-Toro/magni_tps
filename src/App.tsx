import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu';
import Home from './pages/Home';
import FormularioPage from './pages/FormularioPage';
import EditarPage from './pages/EditarPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <HamburgerMenu
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        onClose={closeMenu}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo" element={<FormularioPage />} />
        <Route path="/editar/:id" element={<EditarPage />} />
      </Routes>
    </div>
  );
}

export default App;
