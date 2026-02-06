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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #1a1a2e;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
          background: #333;
          border: 2px solid #4a90e2;
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
          color: #ff6b6b;
          font-size: 1.5rem;
          text-align: center;
          padding: 2rem;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 12px;
          margin: 2rem;
          border: 1px solid rgba(255, 107, 107, 0.3);
        }

        .pairing {
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid rgba(74, 144, 226, 0.3);
        }

        .pairing h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #4a90e2;
        }

        .pairing p {
          font-size: 1.2rem;
          margin: 1rem 0;
          color: #ccc;
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
          border-radius: 16px;
          border: 2px solid #4a90e2;
        }

        .device-code-input {
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: 0.3em;
          color: #000;
          background: rgba(255, 255, 255, 0.9);
          padding: 1rem 2rem;
          border-radius: 12px;
          border: 3px solid #4a90e2;
          text-align: center;
          text-transform: uppercase;
          min-width: 300px;
          outline: none;
        }

        .device-code-input:focus {
          border-color: #357abd;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
        }

        .device-code-input::placeholder {
          color: rgba(0, 0, 0, 0.5);
          font-size: 1.5rem;
          letter-spacing: normal;
        }

        .connect-button {
          background: #4a90e2;
          color: white;
          border: none;
          padding: 1.2rem 2.5rem;
          border-radius: 12px;
          font-size: 1.4rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
          min-width: 150px;
          border: 3px solid #4a90e2;
        }

        .connect-button:hover {
          background: #357abd;
        }

        .connect-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .help-text {
          font-size: 1rem;
          color: #bbb;
          margin-top: 1rem;
        }

        .device-code {
          font-size: 4rem;
          font-weight: bold;
          margin: 2rem 0;
          letter-spacing: 0.3em;
          color: #4a90e2;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          border-radius: 12px;
          border: 2px solid #4a90e2;
        }

        .status-indicator {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          z-index: 1000;
          opacity: 0.8;
        }

        .status-online {
          background: #28a745;
          color: white;
        }

        .status-offline {
          background: #dc3545;
          color: white;
        }

        .status-loading {
          background: #ffc107;
          color: black;
        }

        .playlist-info {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 0.9rem;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .playlist-info.show {
          opacity: 1;
        }

        .progress-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          height: 4px;
          background: #4a90e2;
          transition: width 0.1s linear;
          z-index: 1000;
        }

        .fullscreen-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          z-index: 1000;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .fullscreen-toggle:hover {
          opacity: 1;
        }

        .fullscreen-mode .status-indicator,
        .fullscreen-mode .playlist-info,
        .fullscreen-mode .fullscreen-toggle {
          display: none;
        }

        .fade-transition {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .fade-transition.show {
          opacity: 1;
        }

        .network-status {
          position: fixed;
          top: 60px;
          right: 20px;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          z-index: 1000;
          opacity: 0.8;
        }

        .network-online {
          background: #28a745;
          color: white;
        }

        .network-offline {
          background: #dc3545;
          color: white;
        }
      `}</style>
    </>
  );
}
