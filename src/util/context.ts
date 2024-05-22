import { IUserContext } from '@/interfaces/UserInterfaces';
import { createContext } from 'react'

export const userContext = createContext<IUserContext>({
    user: {},
    setUser: () => {},
    loginModal: false,
    showLoginModal: () => {}
});