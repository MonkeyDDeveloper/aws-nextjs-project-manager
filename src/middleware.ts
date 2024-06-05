import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import type { isAuthResponse } from '@/Interfaces'

export async function middleware(request: NextRequest) {

    const authToken = String(request.cookies.get('authToken')?.value)
    
    const authInfo = await fetch(new URL('/authenticator/isAuthenticated/api', request.url), {
        method: 'POST',
        body: JSON.stringify({token: authToken}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const jsonAuthInfo = await authInfo.json() as isAuthResponse

    if(jsonAuthInfo.error) {
        console.log(jsonAuthInfo.error)
        
        const response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete('isAuth')
        response.cookies.delete('authToken')
        
        return response
    }

    const response = NextResponse.next() 
    response.cookies.set('isAuth', 'true')
    response.cookies.set('authToken', authToken)

    return response 
}

export const config = {
    matcher: ['/auth/:path*']
}