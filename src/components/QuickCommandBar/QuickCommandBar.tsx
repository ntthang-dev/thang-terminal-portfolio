

const QUICK_CMDS = [
  { label: 'help',      icon: '❓' },
  { label: 'whoami',    icon: '👤' },
  { label: 'projects',  icon: '📁' },
  { label: 'skills',    icon: '🔧' },
  { label: 'contact',   icon: '📬' },
  { label: 'clear',     icon: '🗑️' },
];

interface QuickCommandBarProps {
  onCommand: (cmd: string) => void;
}

export default function QuickCommandBar({ onCommand }: QuickCommandBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{
        background: '#1f1f1f',
        borderTop: '2px solid #ffffff',
        boxShadow: '0 -4px 20px rgba(0,255,65,0.15)',
      }}
    >
      {QUICK_CMDS.map(item => (
        <button
          key={item.label}
          onClick={() => onCommand(item.label)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 font-mono text-xs active:translate-y-px transition-transform"
          style={{
            background: '#2a2a2a',
            color: '#b9ccb2',
            border: '1px solid #3b4b37',
            cursor: 'pointer',
            minWidth: '52px',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#00ff41';
            (e.currentTarget as HTMLElement).style.borderColor = '#00ff41';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 8px rgba(0,255,65,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = '#b9ccb2';
            (e.currentTarget as HTMLElement).style.borderColor = '#3b4b37';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <span className="text-base leading-none">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
