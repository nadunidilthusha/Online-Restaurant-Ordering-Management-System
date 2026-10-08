import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { validateLogin } from '../../../utils/validators';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

export default function LoginPage() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    setServerError('');
    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit} noValidate>
        <h1>Admin login</h1>
        <Input label="Email" id="email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
        <Input label="Password" id="password" name="password" type="password" value={form.password} onChange={onChange} error={errors.password} />
        {serverError && <p role="alert" style={{ color: 'var(--danger)' }}>{serverError}</p>}
        <Button type="submit" loading={loading}>Sign in</Button>
      </form>
    </div>
  );
}
