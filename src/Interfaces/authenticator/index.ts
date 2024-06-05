// AUTHENTICATOR INTERFACES

interface isAuthenticatedRequestBody {
    token: string
}


type authenticatorActionsAllowed = 'login' | 'isAuthenticated' | 'logout' | 'register'

// FINISH AUTHENTICATOR INTERFACES

export type {
    isAuthenticatedRequestBody,
    authenticatorActionsAllowed
}