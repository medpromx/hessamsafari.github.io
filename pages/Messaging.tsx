import React, { useState } from 'react';
import { MOCK_MESSAGES, CURRENT_CONSULTANT, MOCK_STUDENTS } from '../constants';
import { User } from '../types';
import { Send, Paperclip, MoreVertical } from 'lucide-react';

interface MessagingProps {
  currentUser: User;
}

const Messaging: React.FC<MessagingProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  // Determine chat partner based on role
  const chatPartner = currentUser.role === 'consultant' ? MOCK_STUDENTS[0] : CURRENT_CONSULTANT;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: chatPartner.id,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'}),
      isRead: false
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative">
             <img src={chatPartner.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{chatPartner.name}</h3>
            <p className="text-xs text-green-600 font-medium">آنلاین</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[70%] px-4 py-3 rounded-2xl relative group
                ${isMe 
                  ? 'bg-primary-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'}
              `}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className={`text-[10px] mt-1 block text-left opacity-70`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white flex items-center gap-2">
        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-100 outline-none"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        >
          <Send size={18} className="rtl:-scale-x-100" />
        </button>
      </form>
    </div>
  );
};

export default Messaging;