import type { ReactNode } from 'react';

interface WindowChromeProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export default function WindowChrome({ title, children, className = '', style, id }: WindowChromeProps) {
  return (
    <div
      id={id}
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        background: '#1f1f1f',
        ...style,
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-2 py-1 shrink-0 select-none"
        style={{
          background: 'linear-gradient(90deg, #000080 0%, #131313 100%)',
          minHeight: '24px',
        }}
      >
        {/* macOS-style traffic light dots */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 inline-block rounded-full"
            style={{ background: '#ff5f57', boxShadow: '0 0 4px rgba(255,95,87,0.7)' }}
          />
          <span
            className="w-3 h-3 inline-block rounded-full"
            style={{ background: '#febc2e', boxShadow: '0 0 4px rgba(254,188,46,0.7)' }}
          />
          <span
            className="w-3 h-3 inline-block rounded-full"
            style={{ background: '#28c840', boxShadow: '0 0 4px rgba(40,200,64,0.7)' }}
          />
        </div>

        {/* Window title */}
        <span
          className="font-body text-xs font-bold tracking-wide uppercase truncate mx-2"
          style={{ color: '#e2e2e2', flex: 1, textAlign: 'center' }}
        >
          {title}
        </span>

        {/* Brand */}
        <span className="font-mono text-xs" style={{ color: '#00ff41', whiteSpace: 'nowrap' }}>⚡ TPS</span>
      </div>

      {/* Content with inset bevel */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
        }}
      >
        {children}
      </div>
    </div>
  );
}
