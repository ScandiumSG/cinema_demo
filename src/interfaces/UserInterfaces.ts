export interface ILoginCredentials {
    email: string,
    password: string
}

export interface IUserContext {
    user: {},
    setUser: () => void,
    loginModal: boolean,
    showLoginModal: () => void,
}