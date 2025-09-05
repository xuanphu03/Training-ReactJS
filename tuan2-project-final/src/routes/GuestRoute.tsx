import type { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth);
  if (token.userToken) return <Navigate to="/" replace />;
  return children;
};

export default GuestRoute;
