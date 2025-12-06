
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import { hapticFeedback } from '../utils/telegram';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  read: boolean;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Mock Data based on ID (Coach or Client)
  const recipientName = id === 'coach' ? 'Тренер Михаил' : 'Анна Морозова';
  const isOnline = true;

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как восстанавливается нога?', sender: 'them', time: '09:41', read: true },
    { id: 2, text: 'Сегодня гораздо лучше. Ролик сильно помог.', sender: 'me', time: '09:42', read: true },
    { id: 3, text: 'Отлично! Готов к жиму завтра?', sender: 'them', time: '09:45', read: true },
  ]);

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    hapticFeedback('light');
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
        const reply: Message = {
            id: Date.now() + 1,
            text: 'Супер! Пиши, если нужно поменять веса.',
            sender: 'them',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };
        setMessages(prev => [...prev, reply]);
        hapticFeedback('medium');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-3 border-b border-slate-100 flex items-center justify-between shadow-sm shrink-0 z-10">
         <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                 <ArrowLeft size={22} className="text-slate-700" />
             </button>
             <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                     <img src={`https://picsum.photos/seed/${id}/100`} alt="Avatar" className="w-full h-full object-cover" />
                     {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                 </div>
                 <div>
                     <h1 className="font-bold text-slate-900 leading-tight">{recipientName}</h1>
                     <p className="text-xs text-blue-500 font-medium">{isOnline ? 'В сети' : 'Был в сети недавно'}</p>
                 </div>
             </div>
         </div>
         <div className="flex items-center gap-1">
             <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"><Phone size={20} /></button>
             <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"><Video size={20} /></button>
             <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><MoreVertical size={20} /></button>
         </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#eef2f6]">
          <div className="text-center text-xs text-slate-400 font-bold uppercase tracking-wide my-4 opacity-50">Сегодня</div>
          
          {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl shadow-sm relative group ${
                        msg.sender === 'me' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
                    }`}
                  >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.sender === 'me' ? 'text-blue-100' : 'text-slate-400'}`}>
                          <span>{msg.time}</span>
                          {msg.sender === 'me' && (
                              msg.read ? <CheckCheck size={12} /> : <Check size={12} />
                          )}
                      </div>
                  </div>
              </div>
          ))}
          <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-slate-100 pb-safe">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-3xl border border-slate-200">
              <input 
                className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium"
                placeholder="Введите сообщение..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    inputText.trim() 
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30 active:scale-95' 
                    : 'bg-slate-300 text-white cursor-not-allowed'
                }`}
              >
                  <Send size={18} className={inputText.trim() ? 'ml-0.5' : ''} />
              </button>
          </div>
      </div>
    </div>
  );
};

export default Chat;
