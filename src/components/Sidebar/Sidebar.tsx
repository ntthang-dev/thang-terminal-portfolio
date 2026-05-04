
import { personalInfo } from '../../data/cvData';

interface NavItem {
  icon: string;
  label: string;
  cmd: string;
  color?: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: '⚡', label: 'whoami',      cmd: 'whoami',     color: '#00ff41' },
  { icon: '📁', label: 'projects',    cmd: 'projects',   color: '#00fbfb' },
  { icon: '🔧', label: 'skills',      cmd: 'skills',     color: '#ffdd00' },
  { icon: '🎓', label: 'education',   cmd: 'education',  color: '#00fbfb' },
  { icon: '💼', label: 'experience',  cmd: 'experience', color: '#84967e' },
  { icon: '🏆', label: 'awards',      cmd: 'awards',     color: '#ffdd00' },
  { icon: '📬', label: 'contact',     cmd: 'contact',    color: '#00ff41' },
  { icon: '📄', label: 'download cv', cmd: 'download cv',color: '#ff4444' },
];

interface SidebarProps {
  onCommand: (cmd: string) => void;
}

export default function Sidebar({ onCommand }: SidebarProps) {
  return (
    <aside
      className="flex flex-col h-full shrink-0 overflow-hidden"
      style={{
        width: '200px',
        background: '#1b1b1b',
        borderRight: '2px solid #808080',
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderBottom: '2px solid #808080',
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-2 text-xs font-mono font-bold tracking-widest uppercase"
        style={{
          background: 'linear-gradient(90deg, #003907 0%, #131313 100%)',
          color: '#00ff41',
          textShadow: '0 0 8px rgba(0,255,65,0.7)',
          borderBottom: '1px solid #3b4b37',
        }}
      >
        ⚡ SYS_NAVIGATOR
      </div>

      {/* Profile block */}
      <div
        className="px-3 py-3 border-b font-mono"
        style={{ borderColor: '#3b4b37' }}
      >
        <div className="text-xs" style={{ color: '#84967e' }}>OPERATOR</div>
        <div className="text-xs font-bold mt-1" style={{ color: '#00ff41', textShadow: '0 0 6px rgba(0,255,65,0.5)' }}>
          N.T.Thang
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#b9ccb2' }}>Power Sys. Eng.</div>
        <div className="text-xs mt-0.5" style={{ color: '#84967e' }}>HCMUT · SCADA Lab</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-1 text-xs font-mono uppercase tracking-widest" style={{ color: '#3b4b37' }}>
          — COMMANDS —
        </div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.cmd}
            onClick={() => onCommand(item.cmd)}
            className="w-full text-left px-3 py-2 flex items-center gap-2 font-mono text-xs transition-all duration-100 group"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#2a2a2a';
              (e.currentTarget as HTMLElement).style.borderLeft = `2px solid ${item.color ?? '#00ff41'}`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderLeft = '2px solid transparent';
            }}
          >
            <span>{item.icon}</span>
            <span style={{ color: item.color ?? '#e2e2e2' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Status bar */}
      <div
        className="px-3 py-2 font-mono border-t"
        style={{ borderColor: '#3b4b37' }}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className="w-2 h-2 inline-block animate-pulse"
            style={{ background: '#00ff41', boxShadow: '0 0 6px #00ff41' }}
          />
          <span style={{ color: '#84967e' }}>GRID: ONLINE</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs mt-1">
          <span
            className="w-2 h-2 inline-block animate-pulse"
            style={{ background: '#00fbfb', boxShadow: '0 0 6px #00fbfb', animationDelay: '0.5s' }}
          />
          <span style={{ color: '#84967e' }}>AI: READY</span>
        </div>
      </div>

      {/* Links */}
      <div className="px-3 py-2 border-t font-mono text-xs" style={{ borderColor: '#3b4b37' }}>
        <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"
          className="block mb-1 transition-colors"
          style={{ color: '#84967e' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00fbfb')}
          onMouseLeave={e => (e.currentTarget.style.color = '#84967e')}
        >
          ⌥ GitHub
        </a>
        <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"
          className="block transition-colors"
          style={{ color: '#84967e' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00fbfb')}
          onMouseLeave={e => (e.currentTarget.style.color = '#84967e')}
        >
          ⌥ LinkedIn
        </a>
      </div>
    </aside>
  );
}
