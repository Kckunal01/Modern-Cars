import React, { useState } from 'react';

export default function InteractiveMap({ onSelectCity }) {
  const hubs = [
    { id: 'delhi', name: 'Delhi NCR', x: 260, y: 120, slots: '12 Slots Available', time: 'Tomorrow', teams: '6 Active Teams' },
    { id: 'mumbai', name: 'Mumbai', x: 180, y: 260, slots: '8 Slots Available', time: 'Next 2 Days', teams: '4 Active Teams' },
    { id: 'pune', name: 'Pune', x: 200, y: 290, slots: '5 Slots Available', time: 'Tomorrow', teams: '3 Active Teams' },
    { id: 'bangalore', name: 'Bengaluru', x: 240, y: 350, slots: '14 Slots Available', time: 'Today', teams: '8 Active Teams' },
    { id: 'hyderabad', name: 'Hyderabad', x: 270, y: 300, slots: '9 Slots Available', time: 'Tomorrow', teams: '5 Active Teams' },
    { id: 'chennai', name: 'Chennai', x: 290, y: 360, slots: '7 Slots Available', time: 'Tomorrow', teams: '4 Active Teams' }
  ];

  const [activeHub, setActiveHub] = useState(hubs[0]);

  const handleHubSelect = (hub) => {
    setActiveHub(hub);
    if (onSelectCity) {
      onSelectCity(hub.name);
    }
  };

  return (
    <div className="map-wrapper premium-card animate-scale-in">
      <div className="map-layout">
        
        {/* Hubs List Selector */}
        <div className="hubs-selector">
          <h3 className="mb-2">Operational Hubs</h3>
          <p className="mb-3 font-sm">Select your location to view real-time doorstep installation slot availability.</p>
          <div className="hubs-list">
            {hubs.map((hub) => (
              <button
                key={hub.id}
                className={`hub-item-btn ${activeHub.id === hub.id ? 'active' : ''}`}
                onClick={() => handleHubSelect(hub)}
              >
                <div className="hub-btn-info">
                  <span className="hub-btn-name">{hub.name}</span>
                  <span className="hub-btn-slots">{hub.slots}</span>
                </div>
                <div className="hub-btn-indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Vector Node Network Map */}
        <div className="map-visualization">
          <svg className="map-svg" viewBox="0 0 500 450" width="100%" height="100%">
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(17,17,17,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" rx="16" />

            {/* Abstract Connected Path Map Lines */}
            <path
              d="M 260,120 L 180,260 L 200,290 L 240,350 L 290,360 L 270,300 Z"
              fill="rgba(229, 57, 53, 0.02)"
              stroke="rgba(17, 17, 17, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line x1="260" y1="120" x2="270" y2="300" stroke="rgba(17, 17, 17, 0.08)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="180" y1="260" x2="270" y2="300" stroke="rgba(17, 17, 17, 0.08)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="200" y1="290" x2="270" y2="300" stroke="rgba(17, 17, 17, 0.08)" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* SVG Node Points */}
            {hubs.map((hub) => (
              <g
                key={hub.id}
                className="map-node-group"
                style={{ cursor: 'pointer' }}
                onClick={() => handleHubSelect(hub)}
              >
                {/* Node outer pulsing glow (if active) */}
                {activeHub.id === hub.id && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="18"
                    fill="rgba(229, 57, 53, 0.15)"
                    className="pulse-circle"
                  />
                )}
                {/* Node secondary outer edge */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={activeHub.id === hub.id ? "10" : "6"}
                  fill={activeHub.id === hub.id ? "#E53935" : "#111111"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  style={{ transition: 'all 0.3s ease' }}
                />
                
                {/* Hub label text */}
                <text
                  x={hub.x + 14}
                  y={hub.y + 4}
                  className={`map-node-label ${activeHub.id === hub.id ? 'active' : ''}`}
                >
                  {hub.name}
                </text>
              </g>
            ))}
          </svg>

          {/* Quick HUD Information Display */}
          <div className="map-hud animate-fade-in" key={activeHub.id}>
            <div className="hud-heading">
              <h4>{activeHub.name} Network</h4>
              <span className="badge-online">Live</span>
            </div>
            <div className="hud-grid">
              <div className="hud-stat">
                <span className="hud-label">Capacity</span>
                <span className="hud-value color-green">{activeHub.slots}</span>
              </div>
              <div className="hud-stat">
                <span className="hud-label">Next Available</span>
                <span className="hud-value">{activeHub.time}</span>
              </div>
              <div className="hud-stat">
                <span className="hud-label">Field Engineers</span>
                <span className="hud-value">{activeHub.teams}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .map-wrapper {
          padding: 0 !important;
          max-width: 1000px;
          margin: 0 auto;
        }

        .map-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          min-height: 480px;
        }

        .hubs-selector {
          padding: 40px;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .font-sm {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .hubs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
          flex-grow: 1;
        }

        .hub-item-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          cursor: pointer;
          transition: var(--transition-smooth);
          text-align: left;
        }

        .hub-item-btn:hover {
          background-color: rgba(17, 17, 17, 0.02);
          border-color: rgba(17, 17, 17, 0.15);
        }

        .hub-item-btn.active {
          background-color: var(--card-bg);
          border-color: var(--accent-red);
          box-shadow: 0 10px 25px -10px rgba(229, 57, 53, 0.15);
        }

        .hub-btn-info {
          display: flex;
          flex-direction: column;
        }

        .hub-btn-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .hub-btn-slots {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .hub-item-btn.active .hub-btn-slots {
          color: var(--accent-red);
          font-weight: 500;
        }

        .hub-btn-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(17, 17, 17, 0.15);
          transition: var(--transition-fast);
        }

        .hub-item-btn.active .hub-btn-indicator {
          background-color: var(--accent-red);
          transform: scale(1.3);
        }

        .map-visualization {
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .map-svg {
          flex-grow: 1;
        }

        .map-node-label {
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 600;
          fill: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .map-node-label.active {
          fill: var(--text-primary);
          font-size: 12px;
          font-weight: 700;
        }

        .pulse-circle {
          animation: mapPulse 1.8s infinite ease-in-out;
          transform-origin: center;
        }

        @keyframes mapPulse {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .map-hud {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 16px 20px;
          box-shadow: var(--shadow-soft);
        }

        .hud-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .hud-heading h4 {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .badge-online {
          font-size: 0.75rem;
          font-weight: 600;
          color: #25D366;
          background: rgba(37, 211, 102, 0.1);
          padding: 2px 8px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .hud-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .hud-stat {
          display: flex;
          flex-direction: column;
        }

        .hud-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .hud-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .color-green {
          color: #2E7D32;
        }

        @media (max-width: 900px) {
          .map-layout {
            grid-template-columns: 1fr;
          }
          .hubs-selector {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 24px;
          }
          .map-visualization {
            padding: 16px;
            height: 380px;
          }
          .map-hud {
            bottom: 16px;
            left: 16px;
            right: 16px;
          }
        }
      `}</style>
    </div>
  );
}
