import { createContext } from 'react'
import { IUserContext } from '@/interfaces/UserInterfaces';
import { IPurchaseModalContext } from '@/interfaces/IScreening';
import { ISeatingContext } from '@/interfaces/ISeat';
import { IBlurContext, IHeaderNavigation } from '@/interfaces/IUtils';

export const userContext = createContext<IUserContext>({
    // @ts-ignore comment
    user: {},
    setUser: () => {},
    loginModal: false,
    showLoginModal: () => {}
});

export const purchaseModalContext = createContext<IPurchaseModalContext>({
    setShowPurchase: () => {},
})

export const seatingContext = createContext<ISeatingContext>({
    // @ts-ignore comment
    selectSeat: (seat: ISeatWithTicket) => {},
    // @ts-ignore comment
    discardSeat: (seat: ISeatWithTicket) => {},
    allowSeating: true,
    toggleAllowSeating: () => {},
});


export const blurContext = createContext<IBlurContext>({
    blurArray: [],
    // @ts-ignore comment
    removeFromArray: (modalName: string) => {},
    // @ts-ignore comment
    addToArray: (modalName: string) => {},
})

export const headerNavigationContext = createContext<IHeaderNavigation>({
    navItems: [{display: "", route: ""}]
})