import { useCallback } from 'react';
import Terminal from '../components/Terminal/Terminal';
import QuickCommandBar from '../components/QuickCommandBar/QuickCommandBar';
import { useTerminal } from '../contexts/TerminalContext';

/**
 * Mobile layout: Full-screen terminal with a fixed QuickCommandBar at bottom.
 * Terminal is padded at the bottom so content is not hidden behind the command bar.
 */
export default function MobileLayout() {
  const { pushInput, runCommand } = useTerminal();

  const handleCommand = useCallback((cmd: string) => {
    pushInput(cmd);
    runCommand(cmd);
  }, [pushInput, runCommand]);

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{ background: '#0e0e0e' }}
    >
      {/* Mobile status bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 shrink-0 font-mono text-xs"
        style={{
          background: 'linear-gradient(90deg, #000080 0%, #131313 100%)',
          borderBottom: '1px solid #3b4b37',
        }}
      >
        <span style={{ color: '#00ff41', textShadow: '0 0 6px rgba(0,255,65,0.6)' }}>
          ⚡ THANG POWER SYSTEMS
        </span>
        <span style={{ color: '#84967e' }}>SCADA v2.5.1</span>
      </div>

      {/* Terminal fills available space; pb-16 accounts for the 64px QuickCommandBar */}
      <div className="flex-1 overflow-hidden" style={{ paddingBottom: '72px' }}>
        <Terminal className="h-full" />
      </div>

      {/* Fixed bottom command bar */}
      <QuickCommandBar onCommand={handleCommand} />
    </div>
  );
}
