import { useTerminal } from '../../contexts/TerminalContext';
import DraggableWindow from './DraggableWindow';
import { projects } from '../../data/cvData';

export default function ProjectsDirectory() {
  const { activeWindows, closeWindow } = useTerminal();

  if (!activeWindows['projects']) return null;

  return (
    <DraggableWindow
      id="projects"
      title="Projects Directory Viewer"
      onClose={() => closeWindow('projects')}
      defaultX={100}
      defaultY={80}
      width={700}
      height={500}
      zIndex={100}
    >
      <div className="p-4 text-sm font-mono flex flex-col gap-6">
        {['power', 'other'].map(cat => (
          <div key={cat}>
            <div className="text-[#00ff41] font-bold border-b border-[#3b4b37] mb-4 pb-1 uppercase tracking-wider">
              {cat === 'power' ? 'Power Systems & Engineering' : 'Software & AI'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.filter(p => p.category === cat).map(p => (
                <div 
                  key={p.title} 
                  className="bg-[#131313] border border-[#3b4b37] p-3 flex flex-col gap-2 hover:border-[#84967e] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[#e2e2e2] font-bold">{p.title}</span>
                    <span className="text-[#ffdd00] text-xs shrink-0 ml-2">[{p.year}]</span>
                  </div>
                  <div className="text-[#84967e] text-xs flex-1">
                    {p.description}
                  </div>
                  {p.tech && (
                    <div className="text-[#b9ccb2] text-[10px] uppercase">
                      TECH: {p.tech}
                    </div>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00fbfb] hover:text-[#00ff41] text-xs underline mt-2 self-start"
                    >
                      {p.urlLabel || 'View Source'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DraggableWindow>
  );
}
