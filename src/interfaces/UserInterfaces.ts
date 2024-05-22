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

export interface IUserContext {
    user?: IUserData,
    setUser: (user?: IUserData) => void,
    loginModal: boolean,
    showLoginModal: () => void,
}