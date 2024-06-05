import { LocalStrategy } from "@/components/AuthStrategies"
import { AuthStrategy, INotAuthenticatedUser } from "@/Interfaces"
import { users } from "@/utils/users"

const tokenSecret = process.env.TOKEN_SECRET || 'secret'

const myLocalStrategy = new LocalStrategy().setTokenSecret(tokenSecret)

class Authenticator {

    constructor(private authStrategy: AuthStrategy) { 
        this.authStrategy = authStrategy
    }

    register(payload: INotAuthenticatedUser) {
        return this.authStrategy.register(payload)
    }

    authenticate(payload: INotAuthenticatedUser) {
        return this.authStrategy.authenticate(payload)
    }

    isAuthenticated(token: string) {
        return this.authStrategy.isAuthenticated(token)
    }

    logout() {
        return this.authStrategy.logout() 
    }

}

function buildAuthenticator(strategy: AuthStrategy): Authenticator {
    return new Authenticator(strategy)
}

const authenticator = buildAuthenticator(myLocalStrategy)

export default authenticator

export { Authenticator }