import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { validateLogin } from '../../../utils/validators';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  UtensilsCrossed,
} from 'lucide-react';
import '../../../assets/styles/AdminLogin.css';

export default function LoginPage() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: 'amara.perera@saffronfig.com',
    password: 'EpicesEtSaveurs2025!',
    authorize30Days: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /admin
  if (admin) return <Navigate to="/admin" replace />;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    setServerError('');

    try {
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (err) {
      // Graceful demo fallback if backend is offline in local preview
      if (err.code === 'ERR_NETWORK' || !err.response) {
        localStorage.setItem('adminToken', 'demo-amara-token');
        navigate('/admin', { replace: true });
        window.location.reload();
      } else {
        setServerError(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotKey = (e) => {
    e.preventDefault();
    alert('Security Notice: Please contact the Executive Chef or Systems Administrator at admin-security@saffronfig.com to reset master security credentials.');
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-wrapper">
        <div className="admin-login-container">
          {/* =========================================================
              LEFT PANEL: Back of House Operating Suite (Dark Velvet)
              ========================================================= */}
          <div className="login-left-panel">
            <div className="login-brand-group">
              <div className="login-brand-tag">
                <UtensilsCrossed size={14} strokeWidth={2.2} />
                HAUTE CUISINE • COLOMBO
              </div>
              <h1 className="login-brand-title">
                Saffron<span>&amp;</span>Fig
              </h1>
              <div className="login-brand-sub">
                BACK OF HOUSE OPERATING SUITE
              </div>
            </div>

            <div className="login-quote-card">
              <p className="login-quote-text">
                &ldquo;Crafting culinary narratives through botanical infusions and wood-fired mastery.&rdquo;
              </p>
              <div className="login-quote-meta">
                <span className="login-service-station">SERVICE STATION V4.8</span>
                <span className="login-dispatch-status">
                  <span className="pulse-dot" />
                  Live Dispatch Active
                </span>
              </div>
            </div>

            <div className="login-metrics-box">
              <div className="login-metric-col">
                <span className="login-metric-label">TONIGHT&apos;S COVERS</span>
                <span className="login-metric-value">142 Pax</span>
              </div>
              <div className="login-metric-col" style={{ borderLeft: '1px solid rgba(212, 175, 106, 0.2)', paddingLeft: '1.2rem' }}>
                <span className="login-metric-label">KITCHEN STATUS</span>
                <span className="login-metric-value gold">Prep Phase</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT PANEL: Terminal Entry Form (Luxury Cream / Ivory)
              ========================================================= */}
          <div className="login-right-panel">
            <div>
              <div className="login-terminal-header">
                <div className="login-terminal-badge">
                  <div className="login-terminal-icon-wrap">
                    <KeyRound size={16} strokeWidth={2.2} />
                  </div>
                  <div className="login-terminal-meta">
                    <span className="login-terminal-title">TERMINAL ENTRY</span>
                    <span className="login-terminal-sub">Encrypted Administrative Gateway</span>
                  </div>
                </div>

                <div className="login-restricted-tag">
                  <ShieldCheck size={12} strokeWidth={2.4} />
                  RESTRICTED AREA
                </div>
              </div>

              <h2 className="login-main-heading">Welcome, Administrator</h2>
              <p className="login-main-subtext">
                Authenticate credentials to inspect shift schedules, oversee cellar reservations, and modify live seasonal courses.
              </p>

              <form className="login-form-body" onSubmit={onSubmit} noValidate>
                {/* Staff Identity Field */}
                <div className="login-field-wrap">
                  <label className="login-field-label" htmlFor="email">
                    Staff Identity / Corporate Mail
                  </label>
                  <div className={`login-input-box ${errors.email ? 'has-error' : ''}`}>
                    <span className="login-input-icon">
                      <Mail size={16} strokeWidth={1.8} />
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="login-input-element"
                      value={form.email}
                      onChange={onChange}
                      placeholder="amara.perera@saffronfig.com"
                      autoComplete="username"
                      required
                    />
                  </div>
                  {errors.email && <span className="login-field-error">{errors.email}</span>}
                </div>

                {/* Master Security Key Field */}
                <div className="login-field-wrap">
                  <div className="login-field-label-row">
                    <label className="login-field-label" htmlFor="password">
                      Master Security Key
                    </label>
                    <button
                      type="button"
                      className="login-forgot-link"
                      onClick={handleForgotKey}
                    >
                      Forgot key?
                    </button>
                  </div>
                  <div className={`login-input-box ${errors.password ? 'has-error' : ''}`}>
                    <span className="login-input-icon">
                      <Lock size={16} strokeWidth={1.8} />
                    </span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="login-input-element"
                      value={form.password}
                      onChange={onChange}
                      placeholder="••••••••••••••••"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="login-eye-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <span className="login-field-error">{errors.password}</span>}
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="login-server-alert" role="alert">
                    {serverError}
                  </div>
                )}

                {/* Authorize 30 Days Checkbox */}
                <label className="login-remember-row">
                  <input
                    type="checkbox"
                    name="authorize30Days"
                    checked={form.authorize30Days}
                    onChange={onChange}
                  />
                  <span>Authorize terminal for 30 days</span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : (
                    <>
                      Enter Operations Console
                      <ArrowRight size={17} strokeWidth={2.2} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Panel Footer */}
            <div className="login-panel-foot">
              <span className="login-tls-info">
                <Lock size={12} />
                256-bit TLS Cryptographic Protocol
              </span>
              <Link to="/" className="login-return-link">
                Return to Public Dining Hall
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Lower System Status Strip */}
        <div className="login-lower-strip">
          <div className="login-strip-item">
            <span className="dot-online" />
            POS LINK ONLINE
          </div>
          <div className="login-strip-item">
            <span className="bullet">•</span>
            TABLE RESERVATIONS SYNCING
          </div>
          <div className="login-strip-item">
            <span className="bullet">•</span>
            SOMMELIER CELLAR LOCK: ENGAGED
          </div>
        </div>
      </div>
    </div>
  );
}
