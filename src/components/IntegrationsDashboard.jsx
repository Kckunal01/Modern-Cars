import React, { useState, useEffect, useRef } from 'react';

export default function IntegrationsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Default welcome log
  useEffect(() => {
    addLog('SYSTEM', 'Modern Cars Integrations Dashboard initialized.', {
      status: 'READY',
      rateLimiter: 'ENABLED (10 tokens/min)',
      hubspotSync: 'MOCKED & ACTIVE',
      zapierWebhooks: 'MOCKED & ACTIVE',
      analytics: 'TRACKING (GA4 + META PIXEL)'
    });
  }, []);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    const handleLog = (e) => {
      const { type, message, payload } = e.detail;
      addLog(type, message, payload);
    };

    window.addEventListener('toggle-integrations-dashboard', handleToggle);
    window.addEventListener('log-integration-event', handleLog);

    return () => {
      window.removeEventListener('toggle-integrations-dashboard', handleToggle);
      window.removeEventListener('log-integration-event', handleLog);
    };
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (type, message, payload = null) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      payload
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const getLogTypeBadgeClass = (type) => {
    switch (type) {
      case 'HUBSPOT': return 'log-badge-hubspot';
      case 'ZAPIER': return 'log-badge-zapier';
      case 'ANALYTICS': return 'log-badge-analytics';
      case 'SECURITY': return 'log-badge-security';
      case 'SYSTEM': return 'log-badge-system';
      default: return '';
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isOpen) return null;

  return (
    <div className="dash-overlay animate-scale-in">
      <div className="dash-panel">
        
        {/* Terminal Header */}
        <div className="dash-header">
          <div className="dash-title">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <h4>Modern Cars Integrations Dashboard</h4>
          </div>
          <div className="dash-actions">
            <button className="dash-btn btn-clear" onClick={clearLogs}>Clear Logs</button>
            <button className="dash-btn btn-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
        </div>

        {/* Terminal Log Output Area */}
        <div className="dash-body">
          <div className="terminal-welcome">
            <pre>{`
  __  __           _                 _                 
 |  \\/  |         | |               | |                
 | \\  / | ___   __| | ___ _ __ _ __ | |     ___   __ _ 
 | |\\/| |/ _ \\ / _\` |/ _ \\ '__| '_ \\| |    / _ \\ / _\` |
 | |  | | (_) | (_| |  __/ |  | | | | |___| (_) | (_| |
 |_|  |_|\\___/ \\__,_|\\___|_|  |_| |_|______\\___/ \\__, |
                                                  __/ |
                                                 |___/ 
            `}</pre>
            <p className="pulse-text mt-1">// Operational Webhooks & Analytics Inspector</p>
          </div>

          <div className="logs-list">
            {logs.length === 0 ? (
              <div className="no-logs">No transaction events captured yet. Try submitting a form, checking out, or clicking CTA buttons.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-row">
                  <div className="log-meta">
                    <span className="log-time">[{log.timestamp}]</span>
                    <span className={`log-badge ${getLogTypeBadgeClass(log.type)}`}>{log.type}</span>
                    <span className="log-msg">{log.message}</span>
                  </div>
                  {log.payload && (
                    <pre className="log-payload">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>

      <style>{`
        .dash-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(17, 17, 17, 0.4);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .dash-panel {
          width: 100%;
          max-width: 900px;
          height: 80vh;
          background: #121214;
          border-radius: var(--border-radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: monospace;
          color: #E2E2E3;
        }

        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #1A1A1E;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dash-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .terminal-dot.red { background-color: #FF5F56; }
        .terminal-dot.yellow { background-color: #FFBD2E; }
        .terminal-dot.green { background-color: #27C93F; }

        .dash-title h4 {
          font-size: 0.9rem;
          font-weight: 500;
          color: #A1A1A5;
          margin-left: 8px;
        }

        .dash-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dash-btn {
          background: transparent;
          border: none;
          color: #A1A1A5;
          cursor: pointer;
          font-family: inherit;
          transition: var(--transition-fast);
        }

        .btn-clear {
          font-size: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 4px;
        }

        .btn-clear:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-close {
          font-size: 1.5rem;
          line-height: 1;
        }

        .btn-close:hover {
          color: #FF5F56;
        }

        .dash-body {
          flex-grow: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .terminal-welcome {
          color: #FF3B30;
          font-size: 11px;
          margin-bottom: 24px;
          opacity: 0.85;
          line-height: 1.2;
        }

        .pulse-text {
          color: #A1A1A5;
          font-size: 13px;
        }

        .logs-list {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .no-logs {
          color: #636366;
          font-size: 0.95rem;
          text-align: center;
          padding: 48px 0;
        }

        .log-row {
          border-left: 2px solid rgba(255, 255, 255, 0.1);
          padding-left: 12px;
        }

        .log-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          margin-bottom: 6px;
        }

        .log-time {
          color: #636366;
        }

        .log-badge {
          font-size: 0.7rem;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
        }

        .log-badge-hubspot { background: rgba(255, 122, 89, 0.15); color: #FF7A59; }
        .log-badge-zapier { background: rgba(255, 79, 0, 0.15); color: #FF4F00; }
        .log-badge-analytics { background: rgba(59, 130, 246, 0.15); color: #60A5FA; }
        .log-badge-security { background: rgba(239, 68, 68, 0.15); color: #F87171; }
        .log-badge-system { background: rgba(16, 185, 129, 0.15); color: #34D399; }

        .log-msg {
          font-weight: 500;
          color: #FFFFFF;
        }

        .log-payload {
          background: #18181C;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: var(--border-radius-sm);
          padding: 12px;
          font-size: 0.8rem;
          color: #34D399;
          overflow-x: auto;
          white-space: pre-wrap;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
