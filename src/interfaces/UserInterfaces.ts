export interface ILoginCredentials {
    email: string,
    password: string
}

export interface IRegisterCredentials extends ILoginCredentials{
    username: string
}

export interface IRegistrationError {
    code: string,
    description: string
}

export interface IUserData {
    id: string,
    username: string,
    email: string,
    role: string,
    token: string,
}

export interface IUserContext {
    user?: IUserData,
    setUser: (user?: IUserData) => void,
    loginModal: boolean,
    showLoginModal: () => void,
}

export interface IUserInformationChange {
    id: string,
    email: string, 
    username: string,
}

export interface IUserPasswordChange {
    id: string,
    oldPassword: string,
    newPassword: string,
}