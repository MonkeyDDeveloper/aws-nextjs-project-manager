import { authenticatorActionsAllowed } from "@/Interfaces"

export const urls = {
    base: '/',
    about: '/about',
    register: '/register',
    auth: {
        userDashboard: '/auth/user/dashboard',
        authenticator: (action: authenticatorActionsAllowed) => `/auth/${action}/api`
    }
}