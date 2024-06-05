import { AuthStrategy, INotAuthenticatedUser, loginResponse, registerResponse } from "@/Interfaces"
import jwt from "jsonwebtoken"
import { users } from "@/utils/users"

class LocalStrategy implements AuthStrategy {

    private tokenSecret: string = "default"
    // private users: INotAuthenticatedUser[] = []
    
    // constructor() {
    //     this.users = []
    // }

    setTokenSecret(secret: string) {
        this.tokenSecret = secret
        return this
    }

    // setUsers(users: INotAuthenticatedUser[]) {
    //     this.users = users
    //     return this
    // }

    async register(payload: INotAuthenticatedUser): Promise<registerResponse> {

        const existUser = users.find(user => user.email === payload.email)

        if(existUser) return {
            message: null,
            error: "User already exists"
        }

        // this.setUsers([...this.users, payload])
        users.push(payload)

        return {
            message: "User registered successfully",
            error: null
        }

    }

    async authenticate(payload: INotAuthenticatedUser): Promise<loginResponse> {

        const user = users.find(user => user.email === payload.email)

        if(!user) return {
            token: null,
            error: "User not found"
        }

        if(user.password != payload.password) return {
            token: null,
            error: "Invalid password"
        }

        const token = jwt.sign(user, this.tokenSecret, {
            expiresIn: "1h"
        })

        return {
            token,
            error: null
        }

    }

    isAuthenticated(token: string): boolean {
        try {
            const decoded = jwt.verify(token, this.tokenSecret)
            return true
        }
        catch(err) {
            return false
        }
    }

    logout() {
    }

}

export {
    LocalStrategy
}