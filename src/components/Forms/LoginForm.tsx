"use client"

import { Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"
import { LoginFormHandler } from "@/app/actions"
import { useFormState } from "react-dom"
import { redirect, useRouter, permanentRedirect, RedirectType } from "next/navigation"
import { urls } from "@/urls"
import { setCookie } from "cookies-next"

const initialState = {
  message: "",
  status: null,
}

export default function LoginForm() {

    const [state, formAction] = useFormState(LoginFormHandler, initialState)
    const router = useRouter()

    if(state.status === "success") {
        setCookie('isAuth', "true")
        setCookie('authToken', state.token)
        router.refresh()
        permanentRedirect(urls.auth.userDashboard, RedirectType.push)
    }

    return (
        <>
            <Card className="mt-12 p-2 mx-auto sm:w-1/2">
                <CardHeader className="justify-center flex-wrap">
                    <p className="w-full mb-2 text-xs font-extrabold text-orange-400">Enter to see your products</p>
                    <h2 className="text-center text-4xl font-extrabold">Login!</h2>
                </CardHeader>
                <CardBody>
                    <form id="loginform" action={formAction}>
                        <Input className="mb-4" type="email" name="email" label="Email" placeholder="Enter your email" />
                        <Input className="mb-4" type="password" name="password" label="Password" placeholder="Enter your password" />
                        <p className="text-red-500 font-bold">
                            {state?.message}
                        </p>
                    </form>
                </CardBody>
                <CardFooter className="justify-center">
                    <button
                        form="loginform"
                        type="submit" 
                        className="bg-orange-400 text-black font-extrabold px-4 py-2 rounded-md w-full"
                    >
                        Login
                    </button>
                </CardFooter>
            </Card>
        </>
    )
}