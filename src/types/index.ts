export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  userType?: 'buyer' | 'seller';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'THB';
  category: string;
  location: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  createdAt: string;
  isFeatured?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: Message;
  createdAt: string;
}

export type Language = 'en' | 'th';
export type Currency = 'USD' | 'THB';