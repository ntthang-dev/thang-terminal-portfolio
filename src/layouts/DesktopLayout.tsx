import { useCallback } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Terminal from '../components/Terminal/Terminal';
import WindowChrome from '../components/WindowChrome/WindowChrome';
import { useTerminal } from '../contexts/TerminalContext';
import LiveGridTransient from '../components/ScadaWidgets/LiveGridTransient';
import RotorAngleStability from '../components/ScadaWidgets/RotorAngleStability';

/**
 * Desktop layout: Sidebar (left) + Terminal window (center/main area).
 * SCADA widget panels will be added in the next phase.
 */
export default function DesktopLayout() {
  const { pushInput, runCommand } = useTerminal();

  const handleCommand = useCallback((cmd: string) => {
    pushInput(cmd);
    runCommand(cmd);
  }, [pushInput, runCommand]);

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: '#131313' }}
    >
      {/* ── Sidebar ───────────────────────────────────────────── */}
      <Sidebar onCommand={handleCommand} />

      {/* ── Main area ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden min-w-0">

        {/* Top status bar */}
        <div
          className="flex items-center justify-between px-3 py-1 font-mono text-xs shrink-0"
          style={{
            background: '#0e0e0e',
            borderTop: '2px solid #ffffff',
            borderLeft: '2px solid #ffffff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          <span style={{ color: '#84967e' }}>
            THANG POWER SYSTEMS — SCADA CONTROL ROOM v2.5.1
          </span>
          <span style={{ color: '#00ff41' }}>
            {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            &nbsp;ICT
          </span>
        </div>

        {/* Main content: Terminal + right placeholder for SCADA widgets */}
        <div className="flex flex-1 gap-3 overflow-hidden min-h-0">

          {/* Terminal window — takes 60% width */}
          <WindowChrome
            id="terminal-window"
            title="TERMINAL — bash v5.2.15"
            className="flex-1 min-w-0"
            style={{ minWidth: 0 }}
          >
            <Terminal />
          </WindowChrome>

          {/* Right column — SCADA panels placeholder (populated in next phase) */}
          <div className="flex flex-col gap-3" style={{ width: '320px', flexShrink: 0 }}>
            <WindowChrome
              id="scada-grid-panel"
              title="LIVE GRID TRANSIENT"
              style={{ height: '45%' }}
            >
              <LiveGridTransient />
            </WindowChrome>

            <WindowChrome
              id="scada-rotor-panel"
              title="ROTOR ANGLE STABILITY"
              style={{ height: '55%' }}
            >
              <RotorAngleStability />
            </WindowChrome>
          </div>

        </div>
      </div>
    </div>
  );
}
