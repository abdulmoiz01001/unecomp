
let adminRoutes = ['/dashboard' , '/products' , '/userorders' , '/users' ]

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import {auth} from '@/auth'

interface User {
  role: string;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session : any = await auth();
    console.log('Session:', session)
    console.log('Enviroment ' , process.env.NEXTAUTH_URL)
    const { pathname } = request.nextUrl
    const isPublicPath = pathname.startsWith('/about') || pathname.startsWith('/contact') || pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/email-verification') || pathname.startsWith('/store') || pathname.startsWith('/email-for-reset-password') || pathname.startsWith('/forgot-password')
    console.log('Path:', pathname)
    console.log('Public:', isPublicPath)
    const token = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token')
    console.log('Token:', token)
    if (isPublicPath && token) {
        return NextResponse.next()
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    if(!isPublicPath && !token){
        
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (isPublicPath && !token) {
        return NextResponse.next()
    }

    if(!isPublicPath && token){
        if(adminRoutes.includes(pathname)){
            if((session.user as User).role === 'admin'){
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        return NextResponse.next()
    }


//   return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/' , '/about' , '/contact' , '/login' , '/signup' , '/email-verification' , '/home' , '/profile' , '/dashboard' , '/products' , '/userorders' , '/users'  , '/addtocart' , '/deliverydetails' , '/orders' ]
}