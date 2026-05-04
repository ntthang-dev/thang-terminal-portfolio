import { useState } from 'react';
import emailjs from '@emailjs/browser';
import DraggableWindow from './DraggableWindow';
import { useTerminal } from '../../contexts/TerminalContext';

export default function ContactForm() {
  const { activeWindows, closeWindow } = useTerminal();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!activeWindows['contact']) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    
    // Check if the placeholder is still used
    const publicKey = 'public_key_placeholder';
    
    if (publicKey === 'public_key_placeholder') {
      // Fallback: Open user's default email client
      const userName = (form.elements.namedItem('user_name') as HTMLInputElement)?.value || 'Guest';
      const userEmail = (form.elements.namedItem('user_email') as HTMLInputElement)?.value || '';
      const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
      
      const subject = encodeURIComponent(`Contact from Portfolio: ${userName}`);
      const body = encodeURIComponent(`Name: ${userName}\nEmail: ${userEmail}\n\nMessage:\n${message}`);
      
      setStatus('success');
      window.location.href = `mailto:trongthang.muzik@outlook.com?subject=${subject}&body=${body}`;
      setTimeout(() => closeWindow('contact'), 2000);
      return;
    }

    emailjs.sendForm('service_default', 'template_default', form, publicKey)
      .then(() => {
        setStatus('success');
        setTimeout(() => closeWindow('contact'), 3000);
      })
      .catch(() => setStatus('error'));
  };

  return (
    <DraggableWindow
      id="contact"
      title="Secure Uplink — Email Comm"
      onClose={() => closeWindow('contact')}
      defaultX={200}
      defaultY={150}
      width={450}
      height={500}
      zIndex={120}
    >
      <div className="p-6 h-full flex flex-col font-mono text-sm bg-[#0e0e0e]">
        <div className="text-[#00fbfb] border-b border-[#3b4b37] pb-2 mb-4 tracking-wider">
          ESTABLISH SECURE CONNECTION
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <label className="text-[#84967e] text-xs">SENDER IDENTITY</label>
            <input 
              type="text" 
              name="user_name" 
              required
              className="bg-[#1b1b1b] border border-[#3b4b37] p-2 text-[#e2e2e2] outline-none focus:border-[#00ff41] transition-colors"
              placeholder="Your Name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#84967e] text-xs">RETURN ADDRESS</label>
            <input 
              type="email" 
              name="user_email" 
              required
              className="bg-[#1b1b1b] border border-[#3b4b37] p-2 text-[#e2e2e2] outline-none focus:border-[#00ff41] transition-colors"
              placeholder="name@domain.com"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <label className="text-[#84967e] text-xs">PAYLOAD (MESSAGE)</label>
            <textarea 
              name="message" 
              required
              className="bg-[#1b1b1b] border border-[#3b4b37] p-2 text-[#e2e2e2] outline-none focus:border-[#00ff41] transition-colors resize-none flex-1"
              placeholder="Enter message..."
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending' || status === 'success'}
            className="mt-2 bg-[#00ff41] text-[#003907] font-bold py-2 px-4 hover:bg-[#ebffe2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'idle' && 'TRANSMIT'}
            {status === 'sending' && 'TRANSMITTING...'}
            {status === 'success' && 'PAYLOAD DELIVERED'}
            {status === 'error' && 'TRANSMISSION FAILED'}
          </button>
        </form>
      </div>
    </DraggableWindow>
  );
}
