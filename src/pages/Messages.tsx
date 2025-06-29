import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { Conversation, Message } from '../types';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import Button from '../components/UI/Button';

const Messages: React.FC = () => {
  const { user } = useAuth();
  const { language } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock conversations data with language support
  useEffect(() => {
    if (!user) return;

    const getMockConversations = (): Conversation[] => {
      if (language === 'th') {
        return [
          {
            id: '1',
            productId: '1',
            productTitle: 'แอปเปิ้ลออร์แกนิคสด',
            buyerId: user.userType === 'buyer' ? user.id : '2',
            sellerId: user.userType === 'seller' ? user.id : '1',
            lastMessage: {
              id: '5',
              conversationId: '1',
              senderId: user.userType === 'buyer' ? user.id : '2',
              receiverId: user.userType === 'seller' ? user.id : '1',
              content: 'โอเค ผมเอา 5 กิโลครับ พรุ่งนี้ไปรับได้ไหมครับ?',
              timestamp: '2024-01-15T10:20:00Z',
              read: false
            },
            createdAt: '2024-01-15T09:00:00Z'
          },
          {
            id: '2',
            productId: '2',
            productTitle: 'ขนมปังโฮมเมด',
            buyerId: user.userType === 'buyer' ? user.id : '3',
            sellerId: user.userType === 'seller' ? user.id : '2',
            lastMessage: {
              id: '10',
              conversationId: '2',
              senderId: user.userType === 'seller' ? user.id : '3',
              receiverId: user.userType === 'buyer' ? user.id : '2',
              content: 'ขอบคุณครับ รอรับสินค้าพรุ่งนี้นะครับ',
              timestamp: '2024-01-14T16:30:00Z',
              read: true
            },
            createdAt: '2024-01-14T14:00:00Z'
          },
          {
            id: '3',
            productId: '3',
            productTitle: 'ข้าวหอมมะลิไทย',
            buyerId: user.userType === 'buyer' ? user.id : '4',
            sellerId: user.userType === 'seller' ? user.id : '3',
            lastMessage: {
              id: '15',
              conversationId: '3',
              senderId: user.userType === 'buyer' ? user.id : '4',
              receiverId: user.userType === 'seller' ? user.id : '3',
              content: 'สนใจครับ ราคาเท่าไหร่ครับ?',
              timestamp: '2024-01-13T11:15:00Z',
              read: true
            },
            createdAt: '2024-01-13T11:00:00Z'
          }
        ];
      } else {
        return [
          {
            id: '1',
            productId: '1',
            productTitle: 'Fresh Organic Apples',
            buyerId: user.userType === 'buyer' ? user.id : '2',
            sellerId: user.userType === 'seller' ? user.id : '1',
            lastMessage: {
              id: '5',
              conversationId: '1',
              senderId: user.userType === 'buyer' ? user.id : '2',
              receiverId: user.userType === 'seller' ? user.id : '1',
              content: 'Perfect! I\'ll take 5kg. Can I pick it up tomorrow?',
              timestamp: '2024-01-15T10:20:00Z',
              read: false
            },
            createdAt: '2024-01-15T09:00:00Z'
          },
          {
            id: '2',
            productId: '2',
            productTitle: 'Homemade Bread Loaf',
            buyerId: user.userType === 'buyer' ? user.id : '3',
            sellerId: user.userType === 'seller' ? user.id : '2',
            lastMessage: {
              id: '10',
              conversationId: '2',
              senderId: user.userType === 'seller' ? user.id : '3',
              receiverId: user.userType === 'buyer' ? user.id : '2',
              content: 'Thank you! Looking forward to picking it up tomorrow.',
              timestamp: '2024-01-14T16:30:00Z',
              read: true
            },
            createdAt: '2024-01-14T14:00:00Z'
          },
          {
            id: '3',
            productId: '3',
            productTitle: 'Thai Jasmine Rice',
            buyerId: user.userType === 'buyer' ? user.id : '4',
            sellerId: user.userType === 'seller' ? user.id : '3',
            lastMessage: {
              id: '15',
              conversationId: '3',
              senderId: user.userType === 'buyer' ? user.id : '4',
              receiverId: user.userType === 'seller' ? user.id : '3',
              content: 'I\'m interested. What\'s the price?',
              timestamp: '2024-01-13T11:15:00Z',
              read: true
            },
            createdAt: '2024-01-13T11:00:00Z'
          }
        ];
      }
    };

    setConversations(getMockConversations());
  }, [user, language]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('loginRequired', language)}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('loginToViewMessages', language)}
          </p>
          <Button onClick={() => window.location.href = '/login'}>
            {t('login', language)}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-[700px] flex">
          {/* Mobile: Show either list or chat */}
          {isMobile ? (
            <>
              {!selectedConversation ? (
                <div className="w-full">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('messages', language)}
                    </h1>
                  </div>
                  <ChatList
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    selectedConversationId={selectedConversation?.id}
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                    <button
                      onClick={handleBackToList}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.userType === 'buyer' 
                        ? (language === 'th' ? 'ผู้ขาย' : 'Seller')
                        : (language === 'th' ? 'ผู้ซื้อ' : 'Buyer')
                      }
                    </h2>
                  </div>
                  <div className="flex-1">
                    <ChatWindow
                      conversation={selectedConversation}
                      onClose={handleBackToList}
                      isOpen={true}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Desktop: Show both list and chat */
            <>
              {/* Chat List */}
              <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('messages', language)}
                  </h1>
                </div>
                <ChatList
                  conversations={conversations}
                  onSelectConversation={handleSelectConversation}
                  selectedConversationId={selectedConversation?.id}
                />
              </div>

              {/* Chat Window */}
              <div className="flex-1">
                {selectedConversation ? (
                  <ChatWindow
                    conversation={selectedConversation}
                    onClose={() => setSelectedConversation(null)}
                    isOpen={true}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t('selectConversation', language)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('selectConversationMessage', language)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;