import React from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import { Conversation } from '../../types';
import SafeImage from '../UI/SafeImage';
import ImagePlaceholder from '../UI/ImagePlaceholder';

interface ChatListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ 
  conversations, 
  onSelectConversation, 
  selectedConversationId 
}) => {
  const { user } = useAuth();
  const { language } = useApp();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getOtherUserName = (conversation: Conversation) => {
    return user?.id === conversation.buyerId 
      ? (language === 'th' ? 'ผู้ขาย' : 'Seller')
      : (language === 'th' ? 'ผู้ซื้อ' : 'Buyer');
  };

  if (conversations.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('noConversationsYet', language)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t('startConversationMessage', language)}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t('searchConversations', language)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              selectedConversationId === conversation.id 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-r-4 border-r-emerald-500' 
                : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ImagePlaceholder type="avatar" size="md" className="rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {getOtherUserName(conversation)}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate mb-1">
                  {t('aboutProduct', language)}: {conversation.productTitle}
                </p>
                
                {conversation.lastMessage && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.lastMessage.content}
                  </p>
                )}
              </div>
              
              {conversation.lastMessage && !conversation.lastMessage.read && 
               conversation.lastMessage.senderId !== user?.id && (
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;