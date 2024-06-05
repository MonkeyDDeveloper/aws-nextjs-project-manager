"use client"

import { RegisterFormHandler } from "@/app/actions"
import { useFormState } from "react-dom"
import { Card, CardHeader, CardBody, Input, CardFooter} from "@nextui-org/react"

const initialState = {
    message: "",
    status: null
}

export default function RegisterForm() {

    const [state, formAction] = useFormState(RegisterFormHandler, initialState)

    return (
        <>
            <Card className="mt-12 p-2 mx-auto sm:w-1/2">
                <CardHeader className="justify-center flex-wrap">
                    <p className="w-full mb-2 text-xs font-extrabold text-orange-400">Start managing your products!</p>
                    <h2 className="text-center text-4xl font-extrabold">Register!</h2>
                </CardHeader>
                <CardBody>
                    <form id="registerform" action={formAction}>
                        <Input className="mb-4" type="email" name="email" label="Email" placeholder="Provide an email" />
                        <Input className="mb-4" type="password" name="password" label="Password" placeholder="Provide a password" />
                        <p className={`font-bold ${state.status === "error" ? "text-red-500" : "text-green-500"}`}>
                            {state?.message}
                        </p>
                    </form>
                </CardBody>
                <CardFooter className="justify-center">
                    <button
                        form="registerform"
                        type="submit" 
                        className="bg-orange-400 text-black font-extrabold px-4 py-2 rounded-md w-full"
                    >
                        Register
                    </button>
                </CardFooter>
            </Card>
        </>
    )
}