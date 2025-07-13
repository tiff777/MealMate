export interface User {
  uid: string;
  name: string;
  email: string;
  university: string;
  major: string;
  bio: string;
  avatar: string;
  interests: string[];
  preferredCusines: string[];
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
  preferredCusine?: string[];
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
  mid: string;
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
  hostId: string;
}

export interface CreateMeal {
  title: string;
  description: string;
  maxParticipants: number;
  restaurantName: string;
  restaurantAddress: string;
  mealDate: string[];
  tags: string[];
}

export interface UpdateMeal {
  title?: string;
  description?: string;
  maxParticipants?: number;
  restaurantName?: string;
  restaurantAddress?: string;
  mealDate?: string[];
  tags?: string[];
}

export interface Participant {
  userId: string;
  avatar: string;
}

export interface ToastProps {
  message: string;
  onClose: () => void;
}
