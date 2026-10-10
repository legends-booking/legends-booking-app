import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { User } from './types';

export function ProtectedRoute({ roles }: { roles?: User['role'][] }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') return <div>Loading…</div>;
  if (status === 'unauthenticated') return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && user && !roles.includes(user.role)) return <p>Not authorised</p>;
  return <Outlet />;
}