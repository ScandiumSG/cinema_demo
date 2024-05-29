import { createContext } from 'react'
import { IUserContext } from '@/interfaces/UserInterfaces';
import { IPurchaseModalContext } from '@/interfaces/IScreening';

export const userContext = createContext<IUserContext>({
    user: {},
    setUser: () => {},
    loginModal: false,
    showLoginModal: () => {}
});

export const purchaseModalContext = createContext<IPurchaseModalContext>({
    showPurchase: false,
    setShowPurchase: () => {},
    showSeatingMap: false,
    setShowSeatingMap: () => {},
})