import { useState, useEffect } from 'react';
import { useTerminal } from '../../contexts/TerminalContext';
import DraggableWindow from './DraggableWindow';

export default function SystemDiagnostics() {
  const { activeWindows, closeWindow } = useTerminal();
  const [stats, setStats] = useState({
    cpu: 0,
    ram: 0,
    net: 0,
    uptime: 0,
  });

  useEffect(() => {
    if (!activeWindows['diagnostics']) return;
    const interval = setInterval(() => {
      setStats(s => ({
        cpu: Math.random() * 40 + 10, // 10-50%
        ram: Math.random() * 10 + 40, // 40-50%
        net: Math.random() * 5,
        uptime: s.uptime + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWindows]);

  if (!activeWindows['diagnostics']) return null;

  return (
    <DraggableWindow
      id="diagnostics"
      title="System Diagnostics (top)"
      onClose={() => closeWindow('diagnostics')}
      defaultX={150}
      defaultY={150}
      width={400}
      height={300}
      zIndex={110}
    >
      <div className="p-4 text-xs font-mono text-[#e2e2e2] flex flex-col gap-2">
        <div className="text-[#ffdd00] mb-2">
          top - {new Date().toLocaleTimeString('en-GB')} up {Math.floor(stats.uptime / 60)} min,  1 user,  load average: {stats.cpu.toFixed(2)}, {(stats.cpu * 0.8).toFixed(2)}, {(stats.cpu * 0.6).toFixed(2)}
        </div>
        
        <div className="flex gap-4">
          <span className="text-[#84967e]">Tasks:</span>
          <span>120 total, 1 running, 119 sleeping</span>
        </div>

        <div className="flex gap-4">
          <span className="text-[#84967e]">%Cpu(s):</span>
          <span>{stats.cpu.toFixed(1)} us, {(stats.cpu*0.2).toFixed(1)} sy,  0.0 ni, {(100 - stats.cpu).toFixed(1)} id</span>
        </div>

        <div className="flex gap-4">
          <span className="text-[#84967e]">MiB Mem:</span>
          <span>32768 total, {(stats.ram * 327.68).toFixed(0)} free, {(32768 - stats.ram * 327.68).toFixed(0)} used</span>
        </div>

        <div className="w-full bg-[#1b1b1b] h-4 mt-2 relative">
          <div 
            className="h-full bg-[#00ff41] transition-all duration-1000" 
            style={{ width: `${stats.cpu}%` }} 
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#131313] font-bold mix-blend-difference">
            CPU USAGE
          </span>
        </div>

        <div className="w-full bg-[#1b1b1b] h-4 mt-1 relative">
          <div 
            className="h-full bg-[#00fbfb] transition-all duration-1000" 
            style={{ width: `${stats.ram}%` }} 
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-[#131313] font-bold mix-blend-difference">
            MEM USAGE
          </span>
        </div>

        <div className="mt-4 border-t border-[#3b4b37] pt-2">
          <table className="w-full text-left">
            <thead className="text-[#84967e]">
              <tr>
                <th>PID</th>
                <th>USER</th>
                <th>PR</th>
                <th>%CPU</th>
                <th>%MEM</th>
                <th>COMMAND</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>root</td>
                <td>20</td>
                <td>{(stats.cpu * 0.1).toFixed(1)}</td>
                <td>0.1</td>
                <td>systemd</td>
              </tr>
              <tr className="text-[#00ff41]">
                <td>42069</td>
                <td>thang</td>
                <td>20</td>
                <td>{(stats.cpu * 0.8).toFixed(1)}</td>
                <td>4.2</td>
                <td>node (vite)</td>
              </tr>
              <tr>
                <td>42070</td>
                <td>thang</td>
                <td>20</td>
                <td>{(stats.cpu * 0.1).toFixed(1)}</td>
                <td>1.0</td>
                <td>bash</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DraggableWindow>
  );
}
