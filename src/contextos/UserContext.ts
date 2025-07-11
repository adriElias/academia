
import { createContext } from 'react';
import { UserData } from '../types';

export const UserContext = createContext<UserData | null>(null);
