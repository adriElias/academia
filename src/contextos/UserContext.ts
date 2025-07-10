
import { createContext } from 'react';
import { UserData } from '../types';

const UserContext = createContext<UserData | null>(null);

export default UserContext;