import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import { Message, Conversation } from '../../types';
import SafeImage from '../UI/SafeImage';
import ImagePlaceholder from '../UI/ImagePlaceholder';
import Button from '../UI/Button';

interface ChatWindowProps {
  conversation: Conversation;
  onClose: () => void;
  isOpen: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onClose, isOpen }) => {
  const { user } = useAuth();
  const { language } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages data with language support
  useEffect(() => {
    const getMockMessages = (): Message[] => {
      if (language === 'th') {
        return [
          {
            id: '1',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'สวัสดีครับ สนใจสินค้านี้มากเลย ยังมีอยู่ไหมครับ?',
            timestamp: '2024-01-15T10:00:00Z',
            read: true
          },
          {
            id: '2',
            conversationId: conversation.id,
            senderId: conversation.sellerId,
            receiverId: conversation.buyerId,
            content: 'สวัสดีครับ ยังมีอยู่ครับ สดใหม่มาก เพิ่งเก็บเมื่อเช้านี้เอง',
            timestamp: '2024-01-15T10:05:00Z',
            read: true
          },
          {
            id: '3',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'ราคาต่อรองได้ไหมครับ ถ้าซื้อหลายกิโล',
            timestamp: '2024-01-15T10:10:00Z',
            read: true
          },
          {
            id: '4',
            conversationId: conversation.id,
            senderId: conversation.sellerId,
            receiverId: conversation.buyerId,
            content: 'ได้ครับ ถ้าซื้อตั้งแต่ 5 กิโลขึ้นไป ลดให้ 10% เลยครับ',
            timestamp: '2024-01-15T10:15:00Z',
            read: true
          },
          {
            id: '5',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'โอเค ผมเอา 5 กิโลครับ พรุ่งนี้ไปรับได้ไหมครับ?',
            timestamp: '2024-01-15T10:20:00Z',
            read: false
          }
        ];
      } else {
        return [
          {
            id: '1',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'Hello! I\'m very interested in this product. Is it still available?',
            timestamp: '2024-01-15T10:00:00Z',
            read: true
          },
          {
            id: '2',
            conversationId: conversation.id,
            senderId: conversation.sellerId,
            receiverId: conversation.buyerId,
            content: 'Hi there! Yes, it\'s still available. Very fresh, just harvested this morning.',
            timestamp: '2024-01-15T10:05:00Z',
            read: true
          },
          {
            id: '3',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'Can we negotiate the price if I buy in bulk?',
            timestamp: '2024-01-15T10:10:00Z',
            read: true
          },
          {
            id: '4',
            conversationId: conversation.id,
            senderId: conversation.sellerId,
            receiverId: conversation.buyerId,
            content: 'Sure! If you buy 5kg or more, I can give you a 10% discount.',
            timestamp: '2024-01-15T10:15:00Z',
            read: true
          },
          {
            id: '5',
            conversationId: conversation.id,
            senderId: conversation.buyerId,
            receiverId: conversation.sellerId,
            content: 'Perfect! I\'ll take 5kg. Can I pick it up tomorrow?',
            timestamp: '2024-01-15T10:20:00Z',
            read: false
          }
        ];
      }
    };

    setMessages(getMockMessages());
  }, [conversation.id, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: conversation.id,
      senderId: user.id,
      receiverId: user.id === conversation.buyerId ? conversation.sellerId : conversation.buyerId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return language === 'th' ? 'วันนี้' : 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return language === 'th' ? 'เมื่อวาน' : 'Yesterday';
    } else {
      return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US');
    }
  };

  const otherUserId = user?.id === conversation.buyerId ? conversation.sellerId : conversation.buyerId;
  const otherUserName = user?.id === conversation.buyerId 
    ? (language === 'th' ? 'ผู้ขาย' : 'Seller')
    : (language === 'th' ? 'ผู้ซื้อ' : 'Buyer');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <ImagePlaceholder type="avatar" size="md" className="rounded-full" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {otherUserName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('aboutProduct', language)}: {conversation.productTitle}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === user?.id;
            const showDate = index === 0 || 
              new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString();

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('typeMessage', language)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;