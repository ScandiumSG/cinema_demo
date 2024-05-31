import { createContext } from 'react'
import { IUserContext } from '@/interfaces/UserInterfaces';
import { IPurchaseModalContext } from '@/interfaces/IScreening';
import ISeat, { ISeatingContext } from '@/interfaces/ISeat';

export const userContext = createContext<IUserContext>({
    user: {},
    setUser: () => {},
    loginModal: false,
    showLoginModal: () => {}
});

export const purchaseModalContext = createContext<IPurchaseModalContext>({
    setShowPurchase: () => {},
    showSeatingMap: false,
    setShowSeatingMap: () => {},
})

export const seatingContext = createContext<ISeatingContext>({
    selectSeat: (seat: ISeat) => {},
    discardSeat: (seat: ISeat) => {},
    allowSeating: true,
    toggleAllowSeating: () => {},
});