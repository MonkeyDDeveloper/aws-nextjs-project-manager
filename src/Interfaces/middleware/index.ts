// MIDDLEWARE INTERFACES

interface isAuthResponse {
    isAuthenticated?: boolean,
    error?: string
}

// FINISH MIDDLEWARE INTERFACES

export {
    type isAuthResponse
}