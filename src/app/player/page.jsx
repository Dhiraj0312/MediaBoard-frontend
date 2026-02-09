'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function PlayerPage() {
  useEffect(() => {
    // Any client-side initialization can go here
  }, []);

  return (
    <>
      <div className="player-container">
        <div id="content" className="fade-transition show">
          <div className="pairing">
            <h1>Digital Signage Player</h1>
            <p>Enter the device code from your admin portal</p>
            <div className="device-input-container">
              <input
                type="text"
                id="deviceCodeInput"
                className="device-code-input"
                placeholder="Enter device code..."
                maxLength={8}
                autoComplete="off"
              />
              <button id="connectButton" className="connect-button">
                Connect
              </button>
            </div>
            <div className="device-code" id="deviceCode" style={{ display: 'none' }}>
              Loading...
            </div>
            <p className="help-text">
              Get the device code from the Screens section in your admin dashboard
            </p>
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
              Press &apos;F&apos; for fullscreen • Press &apos;R&apos; to refresh
            </p>
          </div>
        </div>

        {/* Status indicators */}
        <div id="statusIndicator" className="status-indicator status-loading">
          Connecting...
        </div>
        <div id="networkStatus" className="network-status network-online">
          Online
        </div>

        {/* Playlist info */}
        <div id="playlistInfo" className="playlist-info">
          <div id="playlistName"></div>
          <div id="itemInfo"></div>
        </div>

        {/* Progress bar */}
        <div id="progressBar" className="progress-bar" style={{ width: '0%' }}></div>

        {/* Fullscreen toggle */}
        <button id="fullscreenToggle" className="fullscreen-toggle" title="Toggle Fullscreen">
          ⛶
        </button>
      </div>

      {/* Load player scripts */}
      <Script src="/player/content-manager.js" strategy="afterInteractive" />
      <Script src="/player/monitoring-dashboard.js" strategy="afterInteractive" />
      <Script src="/player/player.js" strategy="afterInteractive" />

      <style jsx global>{`
        body {
          background: var(--color-neutral-900);
          color: var(--color-neutral-50);
          overflow: hidden;
          cursor: default;
        }

        .player-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .media-content {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: var(--color-neutral-800);
        }

        .loading {
          font-size: 2rem;
          text-align: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .error {
          color: var(--color-error-500);
          font-size: 1.5rem;
          text-align: center;
          padding: 2rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: var(--radius-lg);
          margin: 2rem;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .pairing {
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(59, 130, 246, 0.3);
          backdrop-filter: blur(8px);
        }

        .pairing h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 1rem;
          color: var(--color-primary-500);
          font-weight: 700;
        }

        .pairing p {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          margin: 1rem 0;
          color: var(--color-neutral-300);
        }

        .device-input-container {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: var(--radius-xl);
          border: 2px solid var(--color-primary-500);
        }

        .device-code-input {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--color-neutral-900);
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem 2rem;
          border-radius: var(--radius-lg);
          border: 3px solid var(--color-primary-500);
          text-align: center;
          text-transform: uppercase;
          min-width: min(300px, 90vw);
          outline: none;
          transition: all var(--transition-normal);
          min-height: 44px;
        }

        .device-code-input:focus {
          border-color: var(--color-primary-600);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .device-code-input::placeholder {
          color: rgba(0, 0, 0, 0.5);
          font-size: clamp(1rem, 3vw, 1.5rem);
          letter-spacing: normal;
        }

        .connect-button {
          background: var(--color-primary-500);
          color: white;
          border: none;
          padding: 1.2rem 2.5rem;
          border-radius: var(--radius-lg);
          font-size: clamp(1rem, 3vw, 1.4rem);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
          min-width: 150px;
          min-height: 44px;
          border: 3px solid var(--color-primary-500);
        }

        .connect-button:hover {
          background: var(--color-primary-600);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .connect-button:active {
          transform: translateY(0);
        }

        .connect-button:disabled {
          background: var(--color-neutral-400);
          border-color: var(--color-neutral-400);
          cursor: not-allowed;
          transform: none;
        }

        .help-text {
          font-size: clamp(0.875rem, 2vw, 1rem);
          color: var(--color-neutral-400);
          margin-top: 1rem;
        }

        .device-code {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 700;
          margin: 2rem 0;
          letter-spacing: 0.3em;
          color: var(--color-primary-500);
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: var(--radius-lg);
          border: 2px solid var(--color-primary-500);
        }

        .status-indicator {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 1000;
          opacity: 0.9;
          transition: opacity var(--transition-normal);
          backdrop-filter: blur(8px);
        }

        .status-online {
          background: var(--color-success-500);
          color: white;
        }

        .status-offline {
          background: var(--color-error-500);
          color: white;
        }

        .status-loading {
          background: var(--color-warning-500);
          color: var(--color-neutral-900);
        }

        .playlist-info {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          padding: 10px 15px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          z-index: 1000;
          opacity: 0;
          transition: opacity var(--transition-normal);
          backdrop-filter: blur(8px);
        }

        .playlist-info.show {
          opacity: 1;
        }

        .progress-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          height: 4px;
          background: var(--color-primary-500);
          transition: width 0.1s linear;
          z-index: 1000;
          display: none !important;
        }

        .fullscreen-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          border: none;
          color: white;
          padding: 10px;
          border-radius: var(--radius-md);
          cursor: pointer;
          font-size: 1rem;
          z-index: 1000;
          opacity: 0.7;
          transition: all var(--transition-normal);
          backdrop-filter: blur(8px);
          min-width: 44px;
          min-height: 44px;
        }

        .fullscreen-toggle:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.9);
        }

        .fullscreen-mode .status-indicator,
        .fullscreen-mode .network-status,
        .fullscreen-mode .playlist-info,
        .fullscreen-mode .progress-bar,
        .fullscreen-mode .fullscreen-toggle {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }

        body.fullscreen-mode #progressBar {
          display: none !important;
        }

        .fade-transition {
          opacity: 0;
          transition: opacity var(--transition-slow);
        }

        .fade-transition.show {
          opacity: 1;
        }

        .network-status {
          position: fixed;
          top: 60px;
          right: 20px;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          z-index: 1000;
          opacity: 0.9;
          transition: opacity var(--transition-normal);
          backdrop-filter: blur(8px);
        }

        .network-online {
          background: var(--color-success-500);
          color: white;
        }

        .network-offline {
          background: var(--color-error-500);
          color: white;
        }

        @media (max-width: 640px) {
          .pairing {
            padding: 1.5rem;
            margin: 1rem;
          }

          .device-input-container {
            padding: 1.5rem;
            gap: 0.75rem;
          }

          .status-indicator,
          .network-status {
            font-size: 0.75rem;
            padding: 6px 12px;
          }

          .fullscreen-toggle {
            padding: 8px;
          }
        }
      `}</style>
    </>
  );
}
