// src/components/PWATest.tsx
"use client";

import { useEffect, useState } from 'react';

export default function PWATest() {
  const [isPWA, setIsPWA] = useState(false);
  const [swStatus, setSwStatus] = useState('checking...');

  useEffect(() => {
    // Check if app is running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true);
    }

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setSwStatus('registered and ready');
      }).catch(() => {
        setSwStatus('not registered');
      });
    } else {
      setSwStatus('not supported');
    }

    // Log PWA events
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('🔔 beforeinstallprompt event fired!', e);
    });

    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA was installed!');
      setIsPWA(true);
    });
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>PWA: {isPWA ? 'Yes' : 'No'}</div>
      <div>Service Worker: {swStatus}</div>
    </div>
  );
}