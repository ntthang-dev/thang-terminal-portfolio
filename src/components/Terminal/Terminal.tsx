import { useRef, useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useTerminal } from '../../contexts/TerminalContext';
import type { OutputSegment, TerminalLine } from '../../contexts/TerminalContext';

// ── Segment Renderer ──────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  green:  '#00ff41',
  cyan:   '#00fbfb',
  red:    '#ff4444',
  yellow: '#ffdd00',
  white:  '#e2e2e2',
  gray:   '#84967e',
};

function RenderSegment({ seg }: { seg: OutputSegment }) {
  if (seg.type === 'br') return <br />;
  if (seg.type === 'link') {
    return (
      <a
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#00fbfb', textDecoration: 'underline', cursor: 'pointer' }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00ff41'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#00fbfb'; }}
      >
        {seg.label}
      </a>
    );
  }
  if (seg.type === 'jsx') return <>{seg.element}</>;
  return (
    <span style={{ color: seg.color ? COLOR_MAP[seg.color] : '#e2e2e2' }}>
      {seg.content}
    </span>
  );
}

function RenderLine({ line }: { line: TerminalLine }) {
  if (line.kind === 'input') {
    return (
      <div className="terminal-line">
        <span style={{ color: '#00ff41' }}>root@ntthang</span>
        <span style={{ color: '#84967e' }}>:</span>
        <span style={{ color: '#00fbfb' }}>~</span>
        <span style={{ color: '#84967e' }}>$ </span>
        <span style={{ color: '#e2e2e2' }}>{line.raw}</span>
      </div>
    );
  }

  return (
    <div className="terminal-line whitespace-pre-wrap">
      {line.segments?.map((s, i) => <RenderSegment key={i} seg={s} />)}
    </div>
  );
}

// ── Typing sound via Web Audio API ────────────────────────────────────────────

function useTickSound() {
  const ctx = useRef<AudioContext | null>(null);

  return function play() {
    try {
      if (!ctx.current) ctx.current = new AudioContext();
      const ac = ctx.current;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.06, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.04);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.04);
    } catch { /* silent */ }
  };
}

// ── Terminal component ────────────────────────────────────────────────────────

interface TerminalProps {
  className?: string;
}

export default function Terminal({ className = '' }: TerminalProps) {
  const { lines, pushInput, runCommand } = useTerminal();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const playTick = useTickSound();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (lines.length > 1) {
      playTick();
      setTimeout(playTick, 50);
      setTimeout(playTick, 100);
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.trim();
      if (cmd) {
        pushInput(cmd);
        runCommand(cmd);
        setHistory(prev => [cmd, ...prev]);
        setHistoryIdx(-1);
      }
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = [
        'help', 'clear', 'cls', 'download cv', 'lang --vi', 'lang --en', 'lang --fr',
        'echo', 'ping', 'pwd', 'date', 'whoami', 'cat', 'version', 'changelog', 'history',
        'banner', 'skills', 'ls', 'dir', 'projects', 'education', 'experience', 'awards',
        'contact', 'top', 'htop'
      ];
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    playTick();
  }

  return (
    <div
      className={`flex flex-col h-full font-mono text-sm overflow-hidden relative ${className}`}
      onClick={() => inputRef.current?.focus()}
      style={{ background: '#0e0e0e', cursor: 'text' }}
    >
      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto p-3"
        id="terminal-output"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b4b37 #0e0e0e' }}
      >
        {lines.map(line => <RenderLine key={line.id} line={line} />)}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        className="flex items-center px-3 py-2 border-t shrink-0"
        style={{ borderColor: '#3b4b37' }}
      >
        <span style={{ color: '#00ff41', whiteSpace: 'nowrap' }}>root@ntthang</span>
        <span style={{ color: '#84967e' }}>:</span>
        <span style={{ color: '#00fbfb' }}>~</span>
        <span style={{ color: '#84967e' }}>$&nbsp;</span>
        <input
          ref={inputRef}
          id="terminal-input"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none border-none font-mono text-sm"
          style={{ color: '#e2e2e2', caretColor: '#00ff41' }}
          aria-label="Terminal input"
        />
        <span className="animate-pulse ml-px" style={{ color: '#00ff41' }}>█</span>
      </div>
    </div>
  );
}
