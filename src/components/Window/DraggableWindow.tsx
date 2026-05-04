import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DraggableWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  defaultX?: number;
  defaultY?: number;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
}

export default function DraggableWindow({
  title,
  children,
  onClose,
  defaultX = 50,
  defaultY = 50,
  width = 600,
  height = 400,
  zIndex = 50,
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // If minimized, we only show a tiny tab or hide it entirely? Let's hide the content and just show title bar.
  
  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ x: defaultX, y: defaultY, opacity: 0, scale: 0.95 }}
      animate={
        isMaximized
          ? { x: 0, y: 0, width: '100vw', height: '100vh', opacity: 1, scale: 1 }
          : { width, height: isMinimized ? 32 : height, opacity: 1, scale: 1 }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'absolute',
        zIndex: isMaximized ? 9999 : zIndex,
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        background: '#1f1f1f',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(0, 255, 65, 0.1)',
        overflow: 'hidden',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      {/* Title Bar (Drag Handle) */}
      <div
        className="drag-handle flex items-center justify-between px-2 py-1 shrink-0 select-none cursor-move"
        style={{
          background: 'linear-gradient(90deg, #000080 0%, #131313 100%)',
          minHeight: '24px',
        }}
      >
        <span
          className="font-body text-xs font-bold tracking-wide uppercase truncate mx-2"
          style={{ color: '#e2e2e2', flex: 1 }}
          onDoubleClick={() => setIsMaximized(!isMaximized)}
        >
          {title}
        </span>
        
        {/* Window Controls: Mac-style Traffic Lights / Win98 hybrid */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={() => { setIsMinimized(!isMinimized); setIsMaximized(false); }}
            className="w-4 h-4 flex items-center justify-center bg-[#1f1f1f] border hover:bg-[#febc2e]"
            style={{ borderTopColor: '#ffffff', borderLeftColor: '#ffffff', borderRightColor: '#808080', borderBottomColor: '#808080' }}
          >
            <div className="w-2 h-0.5 bg-[#e2e2e2]" />
          </button>
          
          {/* Maximize */}
          <button
            onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
            className="w-4 h-4 flex items-center justify-center bg-[#1f1f1f] border hover:bg-[#28c840]"
            style={{ borderTopColor: '#ffffff', borderLeftColor: '#ffffff', borderRightColor: '#808080', borderBottomColor: '#808080' }}
          >
            <div className="w-2 h-2 border border-[#e2e2e2]" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-4 h-4 flex items-center justify-center bg-[#1f1f1f] border hover:bg-[#ffb4ab]"
            style={{ borderTopColor: '#ffffff', borderLeftColor: '#ffffff', borderRightColor: '#808080', borderBottomColor: '#808080' }}
          >
            <div className="w-1.5 h-1.5 bg-[#e2e2e2]" style={{ clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' }} />
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-auto bg-[#0e0e0e]"
            style={{
              borderTop: '1px solid #808080',
              borderLeft: '1px solid #808080',
              scrollbarWidth: 'thin',
              scrollbarColor: '#3b4b37 #0e0e0e'
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
