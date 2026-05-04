import { useState, useEffect } from 'react';
import { TerminalProvider } from './contexts/TerminalContext';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';
import ProjectsDirectory from './components/Window/ProjectsDirectory';
import SystemDiagnostics from './components/Window/SystemDiagnostics';
import ContactForm from './components/Window/ContactForm';

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();

  return (
    <TerminalProvider>
      {/* CRT scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      <ProjectsDirectory />
      <SystemDiagnostics />
      <ContactForm />
    </TerminalProvider>
  );
}
