import type { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth);
  if (!token.userToken) return <Navigate to="/login" replace />;
  return children;
};

export default AuthRoute;
