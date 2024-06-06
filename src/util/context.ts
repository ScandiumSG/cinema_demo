import { createContext } from 'react'
import { IUserContext } from '@/interfaces/UserInterfaces';
import { IPurchaseModalContext } from '@/interfaces/IScreening';
import ISeat, { ISeatingContext } from '@/interfaces/ISeat';
import { IBlurContext, IHeaderNavigation, IHeaderNavigationContext } from '@/interfaces/IUtils';

export const userContext = createContext<IUserContext>({
    user: {},
    setUser: () => {},
    loginModal: false,
    showLoginModal: () => {}
});

export const purchaseModalContext = createContext<IPurchaseModalContext>({
    setShowPurchase: () => {},
})

export const seatingContext = createContext<ISeatingContext>({
    selectSeat: (seat: ISeat) => {},
    discardSeat: (seat: ISeat) => {},
    allowSeating: true,
    toggleAllowSeating: () => {},
});


export const blurContext = createContext<IBlurContext>({
    blurArray: [],
    removeFromArray: (modalName: string) => {},
    addToArray: (modalName: string) => {},
})

export const headerNavigationContext = createContext<IHeaderNavigation>({
    navItems: [{display: "", route: ""}]
})