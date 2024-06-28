import { isString } from 'util';

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture: string;
  conversations: Conversation[];
  reviews: ToolsReviews[];
  listings: ToolCard[];
  messages: Message[];
  toolrequests: ToolRequest[];
};

export type ToolCard = {
  id: string;
  name: string;
  description: string;
  location: string;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  picture?: string;
  liked: boolean;
  available: boolean;
  reviews: ToolsReviews[];
  ownerId: string;
  toolCategoryId: string;
  toolrequests: ToolRequest[];
};

export type ToolCategory = {
  id: string;
  categoryName?: string;
  tools: ToolCard[];
};

export type ToolsReviews = {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  toolCardId: string;
};

export type Conversation = {
  id: string;
  messages?: Message[];
  senderId: string;
  sender: User;
};

export type Message = {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author: User;
  conversationId: string;
  conversation: Conversation;
};

export type ToolRequest = {
  id: string;
  status: string;
  createdAt: Date;
  toolId: string;
  userId: string;
};
