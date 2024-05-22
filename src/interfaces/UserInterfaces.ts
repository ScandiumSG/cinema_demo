export interface ILoginCredentials {
    email: string,
    password: string
}

export interface IUserData {
    id: string,
    username: string,
    email: string,
    role: number,
    token: string,
}

export const emptyUserData = {
    id: "",
    username: "",
    email: "",
    role: 0,
    token: "",
}

export interface IUserContext {
    user: IUserData,
    setUser: (user: IUserData) => void,
    loginModal: boolean,
    showLoginModal: () => void,
}