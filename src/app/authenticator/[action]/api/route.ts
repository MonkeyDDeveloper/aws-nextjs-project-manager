"use server"

import authenticator, { Authenticator } from "@/components/Authenticator/Authenticator";
import { NextRequest, NextResponse } from 'next/server'
import type { INotAuthenticatedUser, isAuthenticatedRequestBody, authenticatorActionsAllowed } from "@/Interfaces";

async function register(request: NextRequest, authenticator: Authenticator): Promise<NextResponse> {

    const body = await request.json() as INotAuthenticatedUser

    const registerResponse = await authenticator.register(body)

    if(registerResponse.error) {
        const failureResponse = NextResponse.json(registerResponse, { status: 401 })
        failureResponse.cookies.delete('authToken')
        failureResponse.cookies.delete('isAuth')
        return failureResponse
    }

    const successResponse = new NextResponse(
        JSON.stringify(registerResponse),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    return successResponse
}

async function login(request: NextRequest, authenticator: Authenticator): Promise<NextResponse> {
    const body = await request.json() as INotAuthenticatedUser

    const authInfo = await authenticator.authenticate(body)

    if(authInfo.error) {
        const failureResponse = NextResponse.json(authInfo, { status: 401 })
        failureResponse.cookies.delete('authToken')
        failureResponse.cookies.delete('isAuth')
        return failureResponse
    }

    const successResponse = new NextResponse(
        JSON.stringify({
            token: authInfo.token
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    successResponse.cookies.set('authToken', String(authInfo.token))
    successResponse.cookies.set('isAuth', 'true')

    return successResponse
}

async function isAuthenticated(request: NextRequest, authenticator: Authenticator): Promise<NextResponse> {
    
    const requestBody = await request.json() as isAuthenticatedRequestBody

    if(!requestBody.token) {
        return NextResponse.json({ error: 'No cookie found' }, { status: 401 })
    }

    if(!authenticator.isAuthenticated(requestBody.token)) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const successResponse = new NextResponse(
        JSON.stringify({
            isAuthenticated: true
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return successResponse
}

async function logout(request: NextRequest, authenticator: Authenticator): Promise<NextResponse> {
    authenticator.logout()
    const response = new NextResponse(
        JSON.stringify({
            message: 'Logged out successfully'
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    response.cookies.delete('authToken')
    response.cookies.delete('isAuth')
    return response
}

export async function POST(request: NextRequest, { params }: { params: { action: authenticatorActionsAllowed }}): Promise<NextResponse> {
    
    if(params.action === 'register') {
        return await register(request, authenticator)
    }

    if(params.action === 'login') {
        return await login(request, authenticator)
    }

    if(params.action === 'isAuthenticated') {
        return await isAuthenticated(request, authenticator)
    }

    if(params.action === 'logout') {
        return await logout(request, authenticator)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

}
