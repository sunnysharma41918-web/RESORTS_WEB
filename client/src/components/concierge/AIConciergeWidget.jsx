import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Minus,
  ChevronUp,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Users,
  MapPin,
  Phone,
  Compass,
  ArrowRight,
  RefreshCw,
  Palmtree,
  BedDouble,
  Tag,
  FileQuestion,
  Headphones,
} from 'lucide-react';
import { conciergeService } from '../../services/conciergeService';
import logoImg from '../../assets/images/hero/country_holidays_logo.png';

// Custom Luxury Resort Crest Bot Icon
const LuxuryBotIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="glowRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4D2E" />
        <stop offset="100%" stopColor="#C91400" />
      </linearGradient>
    </defs>
    {/* Outer luxury shield */}
    <path
      d="M24 4 L38 10 V23 C38 32.5 32 40 24 44 C16 40 10 32.5 10 23 V10 Z"
      fill="#141419"
      stroke="url(#goldGrad)"
      strokeWidth="1.8"
    />
    {/* Inner Palm Crown */}
    <path
      d="M24 13 C22 17 17 19 15 19 C18 20 22 20 24 23 C26 20 30 20 33 19 C31 19 26 17 24 13 Z"
      fill="url(#goldGrad)"
      opacity="0.9"
    />
    {/* AI Eyes */}
    <circle cx="19" cy="27" r="2.2" fill="#34D399" />
    <circle cx="29" cy="27" r="2.2" fill="#34D399" />
    {/* Smile curve */}
    <path d="M21 32 Q24 35 27 32" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Formatter for markdown-like text (bold, lists, headers)
const FormattedMessage = ({ text = '' }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Heading 3 or bold header
        if (trimmed.startsWith('###') || trimmed.startsWith('##')) {
          const headerText = trimmed.replace(/^#+\s*/, '');
          return (
            <h4 key={idx} className="text-xs font-bold uppercase tracking-wider text-amber-300 pt-1">
              {headerText}
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const bulletContent = trimmed.replace(/^[\*\-•]\s*/, '');
          return (
            <div key={idx} className="flex items-start space-x-2 pl-1 text-[12.5px]">
              <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
              <div>{renderInlineFormatting(bulletContent)}</div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-[12.5px]">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
};

// Helper for inline **bold** with complete asterisk cleanup
function renderInlineFormatting(str = '') {
  const clean = (str || '').replace(/\*\*\*/g, '');
  const parts = clean.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2).replace(/\*/g, '');
      return (
        <strong key={i} className="text-amber-200 font-semibold">
          {inner}
        </strong>
      );
    }
    // Strip any raw single asterisks or stray stars
    return part.replace(/\*/g, '');
  });
}

export default function AIConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'hi' | 'hinglish'
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(
    () => `chhr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );

  const [activeSlots, setActiveSlots] = useState({});
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const getWelcomeMessage = (language = 'en') => {
    let content =
      'Namaste & Welcome to **Country Holidays Hotels & Resorts** 🌴✨\n\nI am your official **AI Travel Assistant**. How may I assist you with luxury villa suites, holiday packages, or itineraries today? Feel free to chat in **English**, **हिंदी**, or **Hinglish**.';
    if (language === 'hi') {
      content =
        'नमस्ते और **कंट्री हॉलीडेज होटल्स एंड रिसॉर्ट्स** में आपका स्वागत है 🌴✨\n\nमैं आपका डिजिटल **AI ट्रेवल असिस्टेंट** हूँ। मैं आज आपकी लक्ज़री स्टे, विला, हॉलिडे पैकेज और इटिनरेरी में क्या सहायता कर सकता हूँ?';
    } else if (language === 'hinglish') {
      content =
        'Namaste & Welcome to **Country Holidays Hotels & Resorts** 🌴✨\n\nMain aapka personal **AI Travel Assistant** hoon. Bataiye, aapke liye kaunsi luxury destination, villa ya holiday package plan karein?';
    }

    return {
      id: 'welcome',
      role: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const [messages, setMessages] = useState([getWelcomeMessage('en')]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, loading, pendingConfirmation]);

  // Quick Action Suggestions
  const quickSuggestions = [
    { label: 'Cliffside Villas', query: 'What villas and suites do you have?', icon: BedDouble },
    { label: 'Kashmir 4-Pax Trip', query: 'Mujhe Kashmir package chahiye for 4 people', icon: Palmtree },
    { label: 'Manali Package', query: 'Manali package kitne din ka hai?', icon: Compass },
    { label: 'Cancellation Policy', query: 'What is your cancellation policy?', icon: FileQuestion },
  ];

  const handleSendMessage = async (textToSend, isExplicitConfirm = false) => {
    const query = textToSend !== undefined ? textToSend : inputMessage;
    if (!query && !isExplicitConfirm) return;
    if (loading) return;

    const userText = isExplicitConfirm ? 'Yes, please confirm and send this request to your travel team.' : query.trim();

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await conciergeService.sendMessage({
        message: userText,
        conversationId,
        language: lang,
        confirmSubmission: isExplicitConfirm,
        conversationHistory: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const replyContent =
        response.message || response.reply || "I'm delighted to assist you. How may I help further?";

      if (response.conversationId) {
        setConversationId(response.conversationId);
      }
      if (response.language && ['en', 'hi', 'hinglish'].includes(response.language)) {
        setLang(response.language);
      }
      if (response.slots) {
        setActiveSlots(response.slots);
      }
      if (response.requiresConfirmation !== undefined) {
        setPendingConfirmation(response.requiresConfirmation);
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        intent: response.intent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        requiresConfirmation: response.requiresConfirmation,
        slots: response.slots,
        isEnquirySubmitted: response.isEnquirySubmitted,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          "I'm experiencing a brief network delay. Please feel free to reach our 24/7 VIP Concierge directly at **+91 98991 08543** or WhatsApp.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    const newId = `chhr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setConversationId(newId);
    setMessages([getWelcomeMessage(lang)]);
    setActiveSlots({});
    setPendingConfirmation(false);
  };

  const handleLangSwitch = (newLang) => {
    setLang(newLang);
    setMessages([getWelcomeMessage(newLang)]);
    setActiveSlots({});
    setPendingConfirmation(false);
  };

  return (
    <>
      {/* 1. Ultra-Luxury Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
          >
            {/* Compact Circular Floating Launcher Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.94 }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1B1B24] via-[#101016] to-[#252535] border-2 border-amber-500/70 shadow-[0_8px_25px_rgba(245,158,11,0.3)] flex items-center justify-center relative cursor-pointer group overflow-hidden"
              title="Open AI Chat"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Bot className="w-6 h-6 text-amber-300 group-hover:text-white transition-colors drop-shadow" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Minimized Floating Capsule */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-[#111116]/95 text-white border border-amber-500/50 px-5 py-3 rounded-full shadow-2xl backdrop-blur-xl cursor-pointer hover:border-amber-400 transition-all"
            onClick={() => setIsMinimized(false)}
          >
            <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="CHHR" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-amber-300">
              Resume AI Assistant
            </span>
            <ChevronUp className="w-4 h-4 text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Luxury Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-[430px] h-[610px] max-h-[92vh] bg-[#0C0C10]/95 text-white border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-2xl flex flex-col overflow-hidden font-manrope backdrop-blur-2xl"
          >
            {/* Top Bar / Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-[#171720] via-[#111117] to-[#171720] border-b border-white/10 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white p-1 border border-amber-500/50 flex items-center justify-center relative shadow-inner">
                  <img src={logoImg} alt="CHHR Logo" className="w-full h-full object-contain rounded-full" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0C0C10]"></span>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-100">
                    CHHR AI
                  </h3>
                </div>
              </div>

              {/* Language Switcher & Window Controls */}
              <div className="flex items-center space-x-2">
                <div className="flex bg-black/60 border border-white/10 rounded-lg p-0.5 text-[10px] font-mono">
                  {['en', 'hi', 'hinglish'].map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangSwitch(l)}
                      className={`px-2 py-0.5 rounded uppercase font-semibold transition-all cursor-pointer ${
                        lang === l
                          ? 'bg-gradient-to-r from-[#FF2E00] to-[#E61A00] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {l === 'hinglish' ? 'Hing' : l}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-white p-0.5 border border-amber-500/40 flex items-center justify-center shrink-0 mt-1 shadow-sm overflow-hidden">
                          <img src={logoImg} alt="CHHR" className="w-full h-full object-contain rounded-full" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl shadow-sm leading-relaxed ${
                          isUser
                            ? 'bg-gradient-to-r from-[#FF2E00] to-[#D41B00] text-white rounded-tr-xs font-normal'
                            : 'bg-[#15151B]/95 text-zinc-200 border border-white/[0.07] rounded-tl-xs backdrop-blur-md'
                        }`}
                      >
                        {isUser ? (
                          <p className="text-[13px]">{msg.content ? msg.content.replace(/\*/g, '') : ''}</p>
                        ) : (
                          <FormattedMessage text={msg.content} />
                        )}
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono text-zinc-500 mt-1 px-1 ${isUser ? 'mr-1' : 'ml-8'}`}>
                      {msg.timestamp}
                    </span>
                  </motion.div>
                );
              })}

              {/* Slot Confirmation Card */}
              {pendingConfirmation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gradient-to-b from-[#1C1814] to-[#121217] border border-amber-500/40 rounded-2xl space-y-3 shadow-xl ml-8"
                >
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase font-bold tracking-wider">
                      Trip Enquiry Preview
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono text-zinc-300 bg-black/60 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">📍 Destination:</span>
                      <strong className="text-amber-200">{activeSlots.destination || 'Luxury Sanctuary'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">👥 Travellers:</span>
                      <strong className="text-zinc-200">{activeSlots.travellers || '2 Guests'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">📅 Dates:</span>
                      <strong className="text-zinc-200">{activeSlots.travelDate || 'Flexible'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">📞 Contact:</span>
                      <strong className="text-amber-300">{activeSlots.phone || 'In Chat'}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleSendMessage(undefined, true)}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#FF2E00] to-[#E61A00] hover:brightness-110 text-white text-xs font-mono font-bold uppercase rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Send</span>
                    </button>
                    <button
                      onClick={() => handleSendMessage('Cancel this inquiry request.')}
                      className="px-4 py-2.5 bg-black/50 hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono uppercase rounded-xl transition-all cursor-pointer"
                    >
                      Modify
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-1.5 p-3.5 bg-[#15151B] border border-white/10 rounded-2xl rounded-tl-xs w-20 ml-8"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-[#0F0F14] border-t border-white/5 flex items-center space-x-2 overflow-x-auto no-scrollbar">
                {quickSuggestions.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s.query)}
                      className="whitespace-nowrap px-3 py-1.5 bg-[#181820] hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 text-[11px] font-mono text-zinc-300 hover:text-amber-200 rounded-full transition-all shrink-0 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Icon className="w-3 h-3 text-amber-400" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Message Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-gradient-to-t from-[#0A0A0D] to-[#121217] border-t border-white/10 flex items-center space-x-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'पूछें (जैसे: मनाली या कश्मीर टूर पैकेज)...'
                    : lang === 'hinglish'
                    ? 'Poochiye (e.g. Kashmir tour details)...'
                    : 'Ask about villas, packages, dining, itineraries...'
                }
                className="flex-1 px-4 py-2.5 bg-black/60 border border-white/10 focus:border-amber-500/50 rounded-xl text-white text-xs font-mono placeholder:text-zinc-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2E00] to-[#E61A00] hover:shadow-[0_0_15px_rgba(255,46,0,0.4)] text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
