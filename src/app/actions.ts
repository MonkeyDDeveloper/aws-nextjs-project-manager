"use server"

import { z } from "zod"

const authFormSchema = z.object({
    email: z.string().email({
        message: 'Invalid Email',
    }),
    password: z.string().min(1, {
        message: "Provide a password"
    })
})

import { INotAuthenticatedUser, LoginFormStatus, loginResponse, RegisterFormStatus, registerResponse } from "@/Interfaces"
import { revalidatePath } from "next/cache"

export async function LoginFormHandler(_prevState: any, formData: FormData): Promise<LoginFormStatus> {

    const userAndEmail: INotAuthenticatedUser = {
        email: String(formData.get('email')),
        password: String(formData.get('password'))
    }

    const validatedFields = authFormSchema.safeParse(userAndEmail)

    if (!validatedFields.success) {
        
        const error = validatedFields.error.issues[0].message

        return {
            message: error,
            status: "error"
        }

    }

    const loginResponse = await fetch('http://localhost:3000/authenticator/login/api', {
        method: 'POST',
        body: JSON.stringify(userAndEmail)
    })
    const loginResponseJson = await loginResponse.json() as loginResponse

    if(loginResponseJson.error) {
        return {
            message: loginResponseJson.error,
            status: "error"
        }
    }

    revalidatePath('/')

    return {
        message: null,
        token: String(loginResponseJson.token),
        status: "success"
    }

}

export async function RegisterFormHandler(_prevState: any, formData: FormData): Promise<RegisterFormStatus> {

    const userAndEmai: INotAuthenticatedUser = {
        email: String(formData.get('email')),
        password: String(formData.get('password'))
    }

    const validatedFields = authFormSchema.safeParse(userAndEmai)

    if (!validatedFields.success) {

        const error = validatedFields.error.issues[0].message

        return {
            message: error,
            status: "error"
        }

    }

    const registerResponse = await fetch('http://localhost:3000/authenticator/register/api', {
        method: 'POST',
        body: JSON.stringify(userAndEmai)
    })
    const registerResponseJson = await registerResponse.json() as registerResponse

    if(registerResponseJson.error) {
        return {
            message: registerResponseJson.error,
            status: "error"
        }
    }

    revalidatePath('/register')

    return {
        message: "User registered successfully, go back to login page",
        status: "success"
    }
}
