// import { NextResponse, type NextRequest } from 'next/server'
// // import { getToken } from 'next-auth/jwt'

// // // List of protected routes
// // const protectedRoutes = [
// //     {
// //         path: '/dashboard',
// //         allowedRoles: ['admin']
// //     },
// //     {
// //         path: '/products',
// //         allowedRoles: ['admin']
// //     },
// //     {
// //         path: '/userorders',
// //         allowedRoles: ['admin']
// //     },
// //     {
// //         path: '/users',
// //         allowedRoles: ['admin']
// //     }
// // ]

// // // List of public routes
// // const publicRoutes = [
// //     '/',
// //     '/contact',
// //     '/about'
// // ]

// export async function middleware(req: NextRequest) {
// //     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' })
// //     const { pathname } = req.nextUrl
// //     let cookie = req.cookies.get('authjs.session-token')
// //     console.log('Cookie:', cookie)

// //     // Check if the route is public
// //     const isPublicRoute = publicRoutes.some(route =>{
// //         console.log('Route:', route)
// //         console.log('Pathname:', pathname)
// //         console.log('Starts with:', pathname.startsWith(route))
// //         pathname.startsWith(route)
// //     } 
// // )

// //     console.log('Public:', isPublicRoute)

    
// //     // If no cookie and accessing a public route, allow access
// //     if (!cookie && isPublicRoute) {
// //         console.log("i ma in not cookie and ispublicroute")
// //         return NextResponse.next()
// //     }
    
// //     // If no cookie and accessing a protected route, redirect to login
// //     if (!cookie && !isPublicRoute) {
// //         console.log("i ma in not cookie only")
// //         return NextResponse.redirect(new URL('/auth/login', req.url))
// //     }
    
// //     // If token is not found and the route is protected, redirect to login
// //     if (!token ) {
// //         console.log("i ma in not token only")
// //         const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route.path))
// //         if (isProtectedRoute) {
// //             return NextResponse.redirect(new URL('/auth/login', req.url))
// //         }
// //         // Allow access to non-protected routes
// //         return NextResponse.next()
// //     }

// //     console.log('Token:', token)

// //     const protectedRoute = protectedRoutes.find(route => pathname.startsWith(route.path))

// //     console.log('Protected:', protectedRoute) 
// //     if (protectedRoute) {
// //         const { role } = token
// //         if (!protectedRoute.allowedRoles.includes(role)) {
// //             return NextResponse.redirect(new URL('/auth/login', req.url))
// //         }
// //         // Allow access to protected route
// //         return NextResponse.next()
// //     }
    
// //     console.log('Protected:', protectedRoutes)
// //     // Allow access to non-protected routes and default page
// //     // return NextResponse.next()
// }

// // export const config = {
// //     matcher: [
// //         '/((?!_next/static|_next/image|favicon.ico|public|api|trpc).*)',
// //         '/store',
// //         '/contact',
// //         '/addtocart',
// //         '/profile',
// //         '/deliverydetails',
// //         '/orders'
// //     ],
// // }

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
    const isPublicPath = pathname.startsWith('/about') || pathname.startsWith('/contact') || pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/email-verification') 
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
  matcher: ['/' , '/about' , '/contact' , '/login' , '/signup' , '/email-verification' , '/home' , '/profile' , '/dashboard' , '/products' , '/userorders' , '/users' , '/store' , '/addtocart' , '/deliverydetails' , '/orders' ]
}