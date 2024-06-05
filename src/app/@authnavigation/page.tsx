"use client"

import { NavigationItem } from "@/Interfaces";
import { useRouter, usePathname, permanentRedirect } from "next/navigation"
import { deleteCookie } from "cookies-next"
import { urls } from "@/urls"
import PartialNavigation from "@/components/navigation/PartialNavigation"
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";

export default function AuthNavigation() {

    const navigationBase: NavigationItem[] = [
        {
            title: 'Home',
            url: urls.base,
            justify: 'end'
        },
        {
            title: 'About',
            url: urls.about,
            justify: 'end'
        },
        {
            title: 'Register',
            url: urls.register,
            showOnAuth: false,
            justify: 'end'
        }
    ]
    const authNavigationItems: NavigationItem[] = [
        {title: 'Dashboard', url: urls.auth.userDashboard, justify: 'center' },
        {title: 'Logout', url: urls.auth.authenticator('logout'), justify: 'end' },    
    ]
    const navigationItems = [...navigationBase, ...authNavigationItems]

    const router = useRouter()
    const pathname = usePathname()

    async function logout() {

        await fetch('http://localhost:3000/authenticator/logout/api', {
            method: 'POST'
        })

        deleteCookie('isAuth')
        deleteCookie('authToken')

        window.location.href = urls.base

    }

    return (
    <>
        <Navbar className="mt-2">
            <PartialNavigation />
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    navigationItems.filter(item => item.justify == 'center').map(item => {
                        return (
                            <NavbarItem key={item.title}>
                                <Link underline="hover" className="text-orange-600" href={item.url}>
                                    {item.title}
                                </Link>
                            </NavbarItem>
                        )
                    })
                }
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                {
                    navigationItems.filter(item => item.justify == 'end').map(item => {
                        if(item.url.includes('logout')) {
                            return (
                                <NavbarItem className="hover:cursor-pointer" key={item.title}>
                                    <Link onClick={logout} underline="hover" className="text-orange-600">
                                        {item.title}
                                    </Link>
                                </NavbarItem>
                            )
                        }
                        return (
                            <NavbarItem key={item.title}>
                                <Link underline="hover" className="text-orange-600" href={item.url}>
                                    {item.title}
                                </Link>
                            </NavbarItem>
                        )
                    })
                }
            </NavbarContent>
            <NavbarContent className="sm:hidden" justify="end">
                <NavbarMenuToggle className="sm:hidden"/>
            </NavbarContent>
            <NavbarMenu>
                {navigationItems.map((item, index) => {
                    if(item.url.includes('logout')) {
                        return (
                            <NavbarItem className="hover:cursor-pointer" key={item.title}>
                                <Link onClick={logout} underline="hover" className="text-orange-600">
                                    {item.title}
                                </Link>
                            </NavbarItem>
                        )
                    }
                    return <NavbarMenuItem key={`${item}-${index}`}>
                        <Link underline="hover"
                            className="w-full"
                            href={item.url}
                            size="lg"   
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                })}
            </NavbarMenu>
        </Navbar>
    </>
    )
}