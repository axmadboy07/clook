import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot
} from 'lucide-react';

export const ConciergeLiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'concierge',
      text: "Bonjour. Welcome to AURA Horology Genève. I am Antoine, your Senior Horological Concierge. How may I assist your collection inquiries today?",
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    "What is the Geneva Seal standard?",
    "How does the flying tourbillon work?",
    "Tell me about insured armored delivery.",
    "Can I request a custom engraving?",
  ];

  const getAutoResponse = (q) => {
    const query = q.toLowerCase();
    if (query.includes('geneva seal') || query.includes('poinçon')) {
      return "The Poinçon de Genève (Geneva Seal) is the highest official certification of Swiss watchmaking excellence. Every single component in our calibres is hand-chamfered and regulated within the Canton of Geneva with guaranteed chronometric precision of ±2 seconds per day.";
    }
    if (query.includes('tourbillon') || query.includes('flying')) {
      return "Our Calibre AH-901 Flying Tourbillon features a cantilevered 60-second cage floating unhindered by an upper bridge. It weighs only 0.28 grams and neutralizes gravitational variance across all wrist angles.";
    }
    if (query.includes('courier') || query.includes('delivery') || query.includes('shipping') || query.includes('armored')) {
      return "Every AURA timepiece is dispatched via dedicated Brink's Armored Aviation courier with 100% full-value insurance underwritten by Lloyd's of London. Delivery requires dual-photo identification upon handoff.";
    }
    if (query.includes('engraving') || query.includes('bespoke') || query.includes('custom')) {
      return "We provide complimentary high-precision laser engraving on the exhibition sapphire caseback (up to 30 characters). You can enter your bespoke text directly on any timepiece product page!";
    }
    if (query.includes('appointment') || query.includes('salon') || query.includes('visit')) {
      return "Private salon viewings are available at our flagships in Geneva (Rue du Rhône 42), Zurich, London, Dubai, Tokyo, and New York. You can reserve an appointment via our Concierge page!";
    }
    return "Thank you for your inquiry. A dedicated Horology Director will also review your dossier. You may proceed with bespoke customization or secure checkout directly on our platform.";
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Simulate concierge typing
    setIsTyping(true);
    setTimeout(() => {
      const reply = getAutoResponse(text);
      const conciergeMsg = {
        id: `c-${Date.now()}`,
        sender: 'concierge',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, conciergeMsg]);
      setIsTyping(false);
    }, 900);
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, userSelect: 'none' }}>
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel"
            style={{
              width: 'min(90vw, 380px)',
              height: '520px',
              maxHeight: '580px',
              borderRadius: 'var(--radius-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              border: '1px solid var(--border-gold-subtle)',
              backgroundColor: 'rgba(10, 11, 14, 0.95)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-obsidian-950)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, var(--bg-obsidian-900) 100%)', border: '1px solid var(--color-gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)' }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span>Antoine</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald-400)' }} />
                  </h4>
                  <p style={{ fontSize: '0.65rem', color: 'var(--color-gold-400)', margin: 0 }}>
                    Senior Horology Concierge • Genève
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-glass"
                style={{ padding: '0.4rem', borderRadius: '50%' }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xl)',
                      borderBottomRightRadius: m.sender === 'user' ? 0 : 'var(--radius-xl)',
                      borderBottomLeftRadius: m.sender === 'concierge' ? 0 : 'var(--radius-xl)',
                      fontSize: '0.75rem',
                      maxWidth: '85%',
                      lineHeight: 1.5,
                      background: m.sender === 'user' ? 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))' : 'rgba(255,255,255,0.05)',
                      color: m.sender === 'user' ? '#000' : 'var(--text-primary)',
                      border: m.sender === 'concierge' ? '1px solid var(--border-subtle)' : 'none',
                      fontWeight: m.sender === 'user' ? 600 : 400
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem', padding: '0 0.25rem' }}>
                    {m.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-xl)',
                    width: '4.5rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold-400)', animation: 'bounce 1s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold-400)', animation: 'bounce 1s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-gold-400)', animation: 'bounce 1s infinite 0.4s' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.375rem', overflowX: 'auto', backgroundColor: 'rgba(5,6,8,0.5)' }}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="glass-pill"
                  style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem', color: 'var(--color-gold-300)', borderColor: 'var(--border-gold-subtle)', whiteSpace: 'nowrap', cursor: 'pointer' }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask concierge about calibres, alloys..."
                className="luxury-input"
                style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.75rem', borderRadius: 'var(--radius-lg)' }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-lg)' }}
                aria-label="Send inquiry"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn-gold"
        style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-gold-glow-lg)',
          fontSize: '0.75rem'
        }}
      >
        <MessageSquare size={18} />
        <span>VIP Concierge</span>
      </motion.button>
    </div>
  );
};

export default ConciergeLiveChat;
