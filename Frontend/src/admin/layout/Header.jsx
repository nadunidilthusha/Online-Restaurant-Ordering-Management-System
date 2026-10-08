import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <span>{admin?.name || 'Administrator'}</span>
      <button className="btn btn-outline" style={{ color: 'var(--wine)', borderColor: 'var(--wine)' }} onClick={handleLogout}>Log out</button>
    </header>
  );
}
