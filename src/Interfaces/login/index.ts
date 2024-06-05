// LOGIN AND REGISTER RELATED INTERFACES
interface INotAuthenticatedUser {
    email: string,
    password: string
}

interface loginResponse {
    token: string | null,
    error: null | string
}

interface registerResponse {
    message: string | null,
    error: string | null,
}

interface LoginFormStatus {
    message: string | null,
    status: "warning" | "error" | "success" | null,
    token?: string
}
interface RegisterFormStatus {
    message: string | null,
    status: "warning" | "error" | "success" | null
}

interface AuthStrategy {
    authenticate: (payload: INotAuthenticatedUser) => Promise<loginResponse>,
    isAuthenticated: (token: string) => boolean,
    logout: () => void,
    register: (payload: INotAuthenticatedUser) => Promise<registerResponse>
}


//FINISH LOGIN RELATED INTERFACES

export type {
    INotAuthenticatedUser,
    loginResponse,
    registerResponse,
    AuthStrategy,
    LoginFormStatus,
    RegisterFormStatus,
}