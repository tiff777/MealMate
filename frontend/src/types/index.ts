
export interface User {
    id: string;
    name: string;
    email: string;
    university: string;
    major: string;
    bio: string;
    avatarUrl: string;
    interests:string[];
    preferredCusine: string[];
    isOnline: boolean;
    lastActive: Date;
    }

export interface RegisterUser{
    name: string;
    email: string;
    password: string;
    university: string;
    major: string;
    bio: string;
    avatarUrl: string;
    interests:string[];
    preferredCusine: string[];
}

export interface UpdateUser {
    name?: string;
    password?: string;
    university?: string;
    major?: string;
    bio?: string;
    interests?:string[];
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
    avatarUrl: string;
}

export interface Meal {
    id: string;
    title: string;
    description: string;
    maxParticipants: number;
    currentParticipants: number;
    restaurantName: string;
    restaurantAddress: string;
    mealDate:string[];
    tags: string[];
    status:"upcoming" | "confirmed" | "completed" | "cancelled";
    createdAt: Date;
    hostId: string;
}

export interface CreateMeal {
    title: string;
    description: string;
    maxParticipants: number;
    restaurantName: string;
    restaurantAddress: string;
    mealDate:string[];
    tags: string[];
}

export interface UpdateMeal {
    title?: string;
    description?: string;
    maxParticipants?: number;
    restaurantName?: string;
    restaurantAddress?: string;
    mealDate?:string[];
    tags?: string[];
}

export interface Participant {
    userId: string;
    joinedAt: Date;   
}


