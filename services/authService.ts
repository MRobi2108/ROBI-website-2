import { User, UserSettings } from '../types';

// Mock Auth Service mimicking Firebase
// In a real app, import { initializeApp } from 'firebase/app'; etc.

const STORAGE_KEY_USER = 'rolb_user';
const STORAGE_KEY_SETTINGS = 'rolb_settings';

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (email && password) {
    const user: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email}&background=6366f1&color=fff`
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    return user;
  }
  throw new Error("Kredensial tidak valid");
};

export const logout = async () => {
  localStorage.removeItem(STORAGE_KEY_USER);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY_USER);
  return stored ? JSON.parse(stored) : null;
};

export const saveUserSettings = (settings: UserSettings) => {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
};

export const getUserSettings = (): UserSettings => {
  const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
  return stored ? JSON.parse(stored) : { apiKey: '', theme: 'dark' };
};