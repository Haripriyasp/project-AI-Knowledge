import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeSide, setActiveSide] = useState('Dashboard');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/login';
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const sideItems = [
    { name: 'Dashboard', icon: '▪' },
    { name: 'Videos', icon: '▶' },
    { name: 'Articles', icon: '📄' },
    { name: 'Courses', icon: '🎓' },
    { name: 'Books', icon: '📚' },
    { name: 'AI Chat', icon: '💬' },
  ];

  const recCards = [
    { type: 'Video', title: 'React hooks explained', tag: 'Web Dev', bg: '#E6F1FB', color: '#0C447C' },
    { type: 'Article', title: 'Intro to Machine Learning', tag: 'AI', bg: '#EAF3DE', color: '#27500A' },
    { type: 'Course', title: 'Python for beginners', tag: 'Python', bg: '#FAEEDA', color: '#633806' },
    { type: 'Book', title: 'Clean Code', tag: 'Programming', bg: '#EEEDFE', color: '#3C3489' },
  ];

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <span style={styles.brand}>KnowledgeAI</span>
        <div style={styles.navRight}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={styles.username}>Hi, {user?.name}!</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.main}>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sideLabel}>MENU</div>
          {sideItems.map((item) => (
            <div
              key={item.name}
              style={{
                ...styles.sideItem,
                ...(activeSide === item.name ? styles.sideActive : {}),
              }}
              onClick={() => {
                setActiveSide(item.name);
                if (item.name === 'AI Chat') window.location.href = '/chat';
              }}
            >
              <span style={styles.sideIcon}>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={styles.content}>

          {/* Welcome banner */}
          <div style={styles.banner}>
            <div>
              <div style={styles.bannerTitle}>Welcome back, {user?.name}! 👋</div>
              <div style={styles.bannerSub}>Ready to learn something new today?</div>
            </div>
            <button
              style={styles.chatBtn}
              onClick={() => window.location.href = '/chat'}
            >
              Ask AI Assistant
            </button>
          </div>

          {/* Metrics */}
          <div style={styles.metricRow}>
            {[
              { val: '0', label: 'Saved items', color: '#EEEDFE', text: '#534AB7' },
              { val: '0', label: 'Topics followed', color: '#E1F5EE', text: '#0F6E56' },
              { val: '0', label: 'Viewed today', color: '#E6F1FB', text: '#185FA5' },
            ].map((m) => (
              <div key={m.label} style={{ ...styles.metricCard, background: m.color }}>
                <div style={{ ...styles.metricVal, color: m.text }}>{m.val}</div>
                <div style={{ ...styles.metricLabel, color: m.text }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Recommended */}
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recommended for you</h3>
            <span style={styles.seeAll}>See all</span>
          </div>

          <div style={styles.recGrid}>
            {recCards.map((card) => (
              <div key={card.title} style={styles.recCard}>
                <span style={{ ...styles.badge, background: card.bg, color: card.color }}>
                  {card.type}
                </span>
                <div style={styles.recTitle}>{card.title}</div>
                <div style={styles.recSub}>Based on: {card.tag}</div>
                <div style={styles.recFooter}>
                  <span style={{ ...styles.recAction, color: card.color }}>View →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f5f5f5', fontFamily: 'sans-serif' },

  // Navbar
  navbar: {
    background: '#fff',
    borderBottom: '1px solid #eee',
    padding: '12px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  brand: { fontSize: '18px', fontWeight: '700', color: '#534AB7' },
  navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#534AB7',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '600',
  },
  username: { fontSize: '13px', color: '#555' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#666',
  },

  // Layout
  main: { display: 'flex', minHeight: 'calc(100vh - 57px)' },

  // Sidebar
  sidebar: {
    width: '190px',
    background: '#fff',
    borderRight: '1px solid #eee',
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sideLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#bbb',
    letterSpacing: '1px',
    padding: '0 12px',
    marginBottom: '8px',
  },
  sideItem: {
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background 0.2s',
  },
  sideActive: {
    background: '#EEEDFE',
    color: '#534AB7',
    fontWeight: '600',
  },
  sideIcon: { fontSize: '14px' },

  // Content
  content: { flex: 1, padding: '28px 32px' },

  // Banner
  banner: {
    background: 'linear-gradient(135deg, #534AB7, #7B74D4)',
    borderRadius: '14px',
    padding: '24px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  bannerTitle: { fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '4px' },
  bannerSub: { fontSize: '13px', color: 'rgba(255,255,255,0.75)' },
  chatBtn: {
    background: '#fff',
    color: '#534AB7',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Metrics
  metricRow: { display: 'flex', gap: '16px', marginBottom: '28px' },
  metricCard: {
    flex: 1,
    borderRadius: '12px',
    padding: '18px 20px',
  },
  metricVal: { fontSize: '26px', fontWeight: '700', marginBottom: '4px' },
  metricLabel: { fontSize: '12px', fontWeight: '500' },

  // Section
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  sectionTitle: { fontSize: '15px', fontWeight: '600', color: '#222' },
  seeAll: { fontSize: '12px', color: '#534AB7', cursor: 'pointer', fontWeight: '500' },

  // Rec cards
  recGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' },
  recCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '18px',
    border: '1px solid #eee',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  badge: {
    fontSize: '11px',
    padding: '3px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '10px',
    fontWeight: '600',
  },
  recTitle: { fontSize: '14px', fontWeight: '600', color: '#222', marginBottom: '4px' },
  recSub: { fontSize: '12px', color: '#999', marginBottom: '12px' },
  recFooter: { borderTop: '1px solid #f0f0f0', paddingTop: '10px' },
  recAction: { fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
};

export default Dashboard;