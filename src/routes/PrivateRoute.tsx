import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { Rol } from '../context/AuthContext';
import type { ReactNode } from 'react';

type PrivateRouteProps = {
  children: ReactNode;
  rol?: Rol;
};

export default function PrivateRoute({ children, rol }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rol && user.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return children;
}
