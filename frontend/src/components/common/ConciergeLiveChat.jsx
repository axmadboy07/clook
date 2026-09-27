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
      text: "Assalomu alaykum. AURA Horology Genève VIP xizmatiga xush kelibsiz. Men Antuan — sizning shaxsiy soatsozlik konsyerjingizman. Bugun qaysi eksklyuziv kalibr yoki individual buyurtma bo‘yicha yordam bera olaman?",
      time: 'Hozirgina',
    },
  ]);

  const quickQuestions = [
    "Jeneva muhri (Geneva Seal) standarti nima?",
    "Uchar turbiyon (Flying Tourbillon) qanday ishlaydi?",
    "Zirhli xavfsiz yetkazib berish haqida",
    "Shaxsiy gravirovka buyurtma qilish",
    "Xususiy salonga qabul belgilash",
  ];

  const getAutoResponse = (q) => {
    const query = q.toLowerCase();
    if (query.includes('geneva') || query.includes('muhr') || query.includes('seal') || query.includes('poinçon')) {
      return "Poinçon de Genève (Jeneva Muhri) — Shveytsariya soatsozligining eng oliy sifat sertifikatidir. Har bir kalibr qismi Jeneva kantonida qo‘lda sayqallanadi, jilolanadi va kuniga ±2 soniyalik o‘ta yuqori aniqlik kafolatlanadi.";
    }
    if (query.includes('tourbillon') || query.includes('turbiyon') || query.includes('flying') || query.includes('mexanizm')) {
      return "Bizning Calibre AH-901 Flying Tourbillon mexanizmimiz yuqori ko‘priksiz erkin suzuvchi 60 soniyali qafasga ega. Uning vazni atigi 0.28 gramm bo‘lib, gravitatsiya ta’sirini butunlay bartaraf etadi.";
    }
    if (query.includes('yetkazib') || query.includes('kuryer') || query.includes('delivery') || query.includes('shipping') || query.includes('zirhli') || query.includes('armored')) {
      return "Har bir CHRONOS soati Brink's maxsus zirhli avia-kuryeri orqali yetkaziladi va London Lloyd's tomonidan 100% to‘liq qiymatda sug‘urtalanadi. Mahsulot faqat shaxsni tasdiqlovchi hujjat asosida qo‘lma-qo‘l topshiriladi.";
    }
    if (query.includes('gravirovka') || query.includes('engraving') || query.includes('yozuv') || query.includes('bespoke') || query.includes('custom')) {
      return "Biz safir orqa oynaga 30 tagacha belgidan iborat bepul lazer gravirovka xizmatini taqdim etamiz. Xohlagan matningizni to‘g‘ridan-to‘g‘ri mahsulot sahifasida kiritishingiz mumkin!";
    }
    if (query.includes('salon') || query.includes('qabul') || query.includes('uchrashuv') || query.includes('appointment') || query.includes('tashrif')) {
      return "Xususiy salonlarimiz Jeneva (Rue du Rhône 42), Syurix, London, Dubay, Tokio va Nyu-Yorkda joylashgan. Saytimizdagi VIP Konsyerj sahifasi orqali shaxsiy qabulga yozilishingiz mumkin.";
    }
    if (query.includes('narx') || query.includes('narxi') || query.includes('price') || query.includes('sotib')) {
      return "Katalogimizdagi har bir model uchun to‘g‘ridan-to‘g‘ri shaxsiy narxlar va muddatli to‘lov imkoniyatlari mavjud. Buyurtma berish uchun mahsulot sahifasidan xaridni rasmiylashtirishingiz mumkin.";
    }
    return "Murojaatingiz uchun tashakkur! So‘rovingiz bosh soatsozlik direktorimiz tomonidan ko‘rib chiqiladi. Shuningdek, katalog orqali 3D moslashtirish yoki to‘g‘ridan-to‘g‘ri buyurtma qilishingiz mumkin.";
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
    <div className="floating-chat-container">
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel"
            style={{
              width: 'min(92vw, 380px)',
              height: 'min(520px, 75vh)',
              borderRadius: 'var(--radius-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              marginBottom: '0.75rem',
              border: '1px solid var(--border-gold-subtle)',
              backgroundColor: 'var(--modal-bg, var(--bg-obsidian-900))'
            }}
          >
            {/* Header */}
            <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    Bosh Horologik Konsyerj • Jeneva
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-glass modal-close-btn tap-target-44"
                style={{ width: '44px', height: '44px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                      background: m.sender === 'user' ? 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-700))' : 'var(--bg-secondary)',
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
            <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.375rem', overflowX: 'auto', backgroundColor: 'var(--bg-secondary)' }}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="glass-pill"
                  style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem', color: 'var(--color-gold-300)', borderColor: 'var(--border-gold-subtle)', whiteSpace: 'nowrap', cursor: 'pointer', backgroundColor: 'var(--glass-pill-bg)' }}
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
              style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Kalibrlar, qotishmalar yoki xizmatlar haqida so‘rang..."
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
