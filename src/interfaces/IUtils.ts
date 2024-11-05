export interface IBlurContext {
    blurArray: string[];
    removeFromArray: (modalName: string) => void;
    addToArray: (modalName: string) => void;
}

export interface INavigationItem {
    display: string;
    route: string;
}

export interface IHeaderNavigation {
    navItems: INavigationItem[];
    toFrontpage: () => void;
}
