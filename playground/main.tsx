import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ServiceGuard } from 'service-guard-react';

const App = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
      color: theme === 'dark' ? '#f8fafc' : '#0f172a',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <ServiceGuard 
        isLocked={isLocked} 
        supportEmail="admin@yourcompany.com"
        theme={theme}
        // customMessage="Tagihan bulan ini belum dibayar. Silakan lakukan pembayaran untuk memulihkan akses."
      >
        <div style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Dashboard Korporat</h1>
          <p style={{ marginBottom: '2rem', color: theme === 'dark' ? '#94a3b8' : '#475569' }}>
            Ini adalah area aplikasi Anda. Jika ServiceGuard aktif, interaksi pada halaman ini akan dinonaktifkan (pointer-events-none) dan overlay glassmorphism akan muncul.
          </p>
          
          <div style={{ 
            background: theme === 'dark' ? '#1e293b' : '#ffffff', 
            padding: '2rem', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>Kontrol Simulasi</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setIsLocked(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Kunci Layanan (Lock)
              </button>

              <button 
                onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: theme === 'dark' ? '#334155' : '#e2e8f0',
                  color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Toggle Theme (Current: {theme})
              </button>
            </div>
          </div>
        </div>
      </ServiceGuard>

      {/* Unlock mechanism purely for testing the playground without refreshing */}
      {isLocked && (
        <button
          onClick={() => setIsLocked(false)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 100000,
            padding: '0.5rem 1rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Unlock (Simulasi Admin)
        </button>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);