import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI learning assistant. What topic do you want to explore today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { messages: updatedMessages },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...updatedMessages, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong!' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage();
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'Hi! I am your AI learning assistant. What topic do you want to explore today?' }]);
  };

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <span style={styles.brand}>KnowledgeAI</span>
        <div style={styles.navRight}>
          {user && (
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <button style={styles.backBtn} onClick={() => window.location.href = '/dashboard'}>
            ← Dashboard
          </button>
        </div>
      </div>

      {/* Chat wrapper */}
      <div style={styles.wrapper}>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sideTitle}>Chats</div>
          <div style={styles.activeChat}>
            <div style={styles.activeDot} />
            <div>
              <div style={styles.activeChatName}>Knowledge Assistant</div>
              <div style={styles.activeChatSub}>AI Learning Bot</div>
            </div>
          </div>
          <button style={styles.clearBtn} onClick={clearChat}>
            + New Chat
          </button>

          <div style={styles.suggestTitle}>Suggested topics</div>
          {['React basics', 'Machine Learning', 'Python tips', 'Data Structures'].map((topic) => (
            <div
              key={topic}
              style={styles.suggestItem}
              onClick={() => setInput(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Main chat */}
        <div style={styles.chatBox}>

          {/* Chat header */}
          <div style={styles.chatHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.aiAvatar}>AI</div>
              <div>
                <div style={styles.aiName}>Knowledge Assistant</div>
                <div style={styles.aiStatus}>
                  <span style={styles.statusDot} /> Online
                </div>
              </div>
            </div>
            <div style={styles.msgCount}>{messages.length} messages</div>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.msgRow,
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={styles.smallAvatar}>AI</div>
                )}
                <div style={{
                  ...styles.bubble,
                  ...(msg.role === 'user' ? styles.userBubble : styles.aiBubble),
                }}>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div style={{ ...styles.smallAvatar, background: '#EEEDFE', color: '#534AB7' }}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ ...styles.msgRow, justifyContent: 'flex-start' }}>
                <div style={styles.smallAvatar}>AI</div>
                <div style={{ ...styles.bubble, ...styles.aiBubble }}>
                  <div style={styles.typingDots}>
                    <span style={{ ...styles.dot, animationDelay: '0s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <div style={styles.inputRow}>
              <input
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything... (Enter to send)"
                disabled={loading}
              />
              <button
                style={{
                  ...styles.sendBtn,
                  opacity: loading || !input.trim() ? 0.6 : 1,
                }}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                Send ➤
              </button>
            </div>
            <div style={styles.inputHint}>Press Enter to send • Shift+Enter for new line</div>
          </div>

        </div>
      </div>

      {/* Typing animation */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
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
  backBtn: {
    background: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#666',
  },

  // Layout
  wrapper: {
    maxWidth: '1100px',
    margin: '24px auto',
    display: 'flex',
    gap: '16px',
    padding: '0 16px',
    height: 'calc(100vh - 100px)',
  },

  // Sidebar
  sidebar: {
    width: '220px',
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #eee',
    padding: '20px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexShrink: 0,
  },
  sideTitle: { fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '1px', marginBottom: '4px' },
  activeChat: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#EEEDFE',
    borderRadius: '8px',
    padding: '10px 12px',
  },
  activeDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#534AB7', flexShrink: 0 },
  activeChatName: { fontSize: '13px', fontWeight: '600', color: '#534AB7' },
  activeChatSub: { fontSize: '11px', color: '#8B83D4' },
  clearBtn: {
    background: 'transparent',
    border: '1px dashed #ddd',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '12px',
    color: '#888',
    cursor: 'pointer',
    textAlign: 'center',
  },
  suggestTitle: { fontSize: '11px', fontWeight: '700', color: '#bbb', letterSpacing: '1px', marginTop: '8px' },
  suggestItem: {
    fontSize: '12px',
    color: '#555',
    padding: '7px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    background: '#f9f9f9',
    border: '1px solid #eee',
  },

  // Chat box
  chatBox: {
    flex: 1,
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  // Chat header
  chatHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  aiAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#534AB7',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '13px',
  },
  aiName: { fontSize: '14px', fontWeight: '600', color: '#222' },
  aiStatus: { fontSize: '12px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' },
  statusDot: {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#22c55e',
  },
  msgCount: { fontSize: '12px', color: '#aaa' },

  // Messages
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    background: '#fafafa',
  },
  msgRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
  },
  smallAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#534AB7',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '68%',
    padding: '11px 15px',
    borderRadius: '12px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  userBubble: {
    background: '#534AB7',
    color: '#fff',
    borderBottomRightRadius: '3px',
  },
  aiBubble: {
    background: '#fff',
    color: '#222',
    border: '1px solid #eee',
    borderBottomLeftRadius: '3px',
  },

  // Typing dots
  typingDots: { display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' },
  dot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#534AB7',
    display: 'inline-block',
    animation: 'bounce 1.2s infinite',
  },

  // Input
  inputArea: {
    padding: '14px 20px',
    borderTop: '1px solid #eee',
    background: '#fff',
  },
  inputRow: { display: 'flex', gap: '10px', marginBottom: '6px' },
  input: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '24px',
    outline: 'none',
    background: '#fafafa',
  },
  sendBtn: {
    background: '#534AB7',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    padding: '10px 22px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  inputHint: { fontSize: '11px', color: '#bbb', textAlign: 'center' },
};

export default Chat;