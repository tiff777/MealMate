export interface User {
  uid: number;
  name: string;
  email: string;
  university: string;
  major: string;
  bio: string;
  avatar: string;
  interests: string[];
  preferredCuisines: string[];
  isOnline: boolean;
  lastActive: Date;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  university: string;
  major: string;
  bio: string;
  avatar: string;
  interests: string[];
  preferredCuisines: string[];
}

export interface UpdateUser {
  name?: string;
  password?: string;
  university?: string;
  major?: string;
  bio?: string;
  interests?: string[];
  preferredCuisines?: string[];
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface changePassword {
  oldPassword: string;
  newPassword: string;
}

export interface changeAvatar {
  avatar: string;
}

export interface Meal {
  mid: number;
  title: string;
  description: string;
  maxParticipant: number;
  currentParticipant: number;
  participants: Participant[];
  restaurantName: string;
  restaurantAddress: string;
  mealDate: Date;
  tags: string[];
  status: number;
  createdAt: Date;
  hostId: number;
}

export interface CreateMeal {
  title: string;
  description: string;
  maxParticipant: number;
  restaurantName: string;
  restaurantAddress: string;
  mealDate: Date | string;
  tags: string[];
}

export interface UpdateMeal {
  title?: string;
  description?: string;
  maxParticipant?: number;
  restaurantName?: string;
  restaurantAddress?: string;
  mealDate?: Date | string;
  tags?: string[];
}

export interface Participant {
  userId: number;
  avatar: string;
}

export interface ToastProps {
  message: string;
  onClose: () => void;
}

export type MealFormData = CreateMeal | UpdateMeal;

export interface LastMessage {
  content: string;
  timeStamp: Date | undefined;
}

export interface ChatRoomInfo {
  roomId: number;
  name: string;
  description: string;
  memberCount: number;
  lastMessage?: LastMessage;
  lastMessageTime?: Date;
  unreadCount: number;
  isActive: boolean;
}

export interface ChatMessage {
  id: number;
  userName: string;
  content: string;
  timestamp: Date;
  roomId: number;
}
