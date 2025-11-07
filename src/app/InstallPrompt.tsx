// src/components/InstallPrompt.tsx
"use client";

import { useState, useEffect, useRef } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [totalInstalls, setTotalInstalls] = useState<number | null>(null);
  
  // Use a ref to track if we've already recorded this installation
  const hasTrackedInstallation = useRef(false);

  // Fetch installation count on component mount
  useEffect(() => {
    fetchInstallationCount();
  }, []);

  const fetchInstallationCount = async () => {
    try {
      const response = await fetch('/api/installations');
      const data = await response.json();
      if (data.success) {
        setTotalInstalls(data.totalInstallations); // Remove the +12
      }
    } catch (error) {
      console.error('Error fetching installation count:', error);
    }
  };

  const trackInstallation = async () => {
    // Prevent duplicate tracking
    if (hasTrackedInstallation.current) {
      console.log('🔧 Installation already tracked, skipping...');
      return;
    }
    
    hasTrackedInstallation.current = true;
    
    try {
      // Collect all browser data on the client side
      const installationData = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceMemory: (navigator as any).deviceMemory || 0,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        screenResolution: `${screen.width}x${screen.height}`,
        cookiesEnabled: navigator.cookieEnabled,
        javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
        referrer: document.referrer,
        url: window.location.href,
      };

      const response = await fetch('/api/installations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(installationData),
      });

      if (response.ok) {
        console.log('✅ Installation tracked successfully');
        // Refresh the count after tracking new installation
        fetchInstallationCount();
      } else {
        console.error('❌ Failed to track installation');
        // Reset the flag if tracking failed
        hasTrackedInstallation.current = false;
      }
    } catch (error) {
      console.error('Error tracking installation:', error);
      // Reset the flag if tracking failed
      hasTrackedInstallation.current = false;
    }
  };

  useEffect(() => {
    console.log('🔧 InstallPrompt: Checking for PWA support...');

    const hasDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (hasDismissed) {
      setDismissed(true);
    }

    const handler = (e: BeforeInstallPromptEvent) => {
      console.log('🎯 beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e);
      
      if (!dismissed) {
        setTimeout(() => {
          setIsVisible(true);
        }, 1000);
      }
    };

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      console.log('🔧 App is already installed');
      return;
    }

    window.addEventListener('beforeinstallprompt', handler as EventListener);

    // Only track installation via appinstalled event, not both
    window.addEventListener('appinstalled', () => {
      console.log('✅ App was installed via browser prompt!');
      trackInstallation();
      handleClose();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
    };
  }, [dismissed]);

  // Alternative: Only track via appinstalled event
const handleInstall = async () => {
  console.log('🔧 Install button clicked');
  
  if (deferredPrompt) {
    try {
      console.log('🔧 Showing install prompt...');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`🔧 User response: ${outcome}`);
      
      setDeferredPrompt(null);
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted installation via our prompt');
        // Don't track here - let appinstalled event handle it
        handleClose();
      }
    } catch (error) {
      console.error('❌ Error installing PWA:', error);
    }
  } else {
    console.log('❌ No deferred prompt available');
  }
};

  const handleDismiss = () => {
    console.log('🔧 User dismissed prompt permanently');
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
    setDismissed(true);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  const handleClose = () => {
    console.log('🔧 User closed prompt temporarily');
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`fixed bottom-4 right-4 left-4 md:left-auto md:right-4 md:bottom-4 md:max-w-sm z-50 transform transition-all duration-300 ${
          isClosing 
            ? 'opacity-0 translate-y-10 scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden relative">
          {/* Floating Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Header with Icon */}
          <div className="p-6 pb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Install App
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get the full experience
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
              Install my portfolio app on your device for faster access and offline functionality. 
            </p>

            {/* Installation Counter */}
            {totalInstalls !== null && totalInstalls > 0 && (
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {totalInstalls.toLocaleString()}
                  </span> {totalInstalls === 1 ? 'person has' : 'people have'} installed this app
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar Animation */}
          <div className="px-6 pb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: isClosing ? '0%' : '100%',
                  transition: isClosing ? 'width 0.3s ease-in' : 'width 3s ease-out'
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex space-x-3">
              <button
                onClick={handleDismiss}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
              >
                Maybe Later
              </button>
              <button
                onClick={handleInstall}
                className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Install Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}