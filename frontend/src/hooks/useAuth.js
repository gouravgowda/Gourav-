import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isLoggedIn, login, logout, setUser } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    user,
    token,
    isLoggedIn,
    login,
    logout: handleLogout,
    setUser,
  };
};
