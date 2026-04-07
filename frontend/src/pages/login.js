import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://project-ai-knowledge.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Left purple panel */}
        <div style={styles.left}>
          <div style={styles.logo}>KnowledgeAI</div>
          <div>
            <div style={styles.tagline}>Learn smarter,<br />not harder.</div>
            <div style={styles.tagSub}>Your AI-powered learning companion for students and curious minds.</div>
          </div>
          <div style={styles.copy}>© 2026 KnowledgeAI</div>
        </div>

        {/* Right form panel */}
        <div style={styles.right}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Login to continue learning</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={styles.footer}>
            Don't have an account?{' '}
            <span style={styles.link} onClick={() => window.location.href = '/register'}>
              Sign up
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '780px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
    minHeight: '480px',
  },

  // Left panel
  left: {
    flex: 1,
    background: '#534AB7',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
  },
  tagline: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#fff',
    lineHeight: '1.35',
    marginBottom: '12px',
  },
  tagSub: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: '1.6',
  },
  copy: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.35)',
  },

  // Right panel
  right: {
    flex: 1,
    background: '#fff',
    padding: '48px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#111',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '28px',
  },
  field: {
    marginBottom: '16px',
  },
  label: {
    fontSize: '12px',
    color: '#666',
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '13px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#fafafa',
    color: '#111',
  },
  btn: {
    width: '100%',
    padding: '11px',
    background: '#534AB7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    background: '#fff0f0',
    color: '#c0392b',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
  },
  footer: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#888',
    marginTop: '20px',
  },
  link: {
    color: '#534AB7',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Login;