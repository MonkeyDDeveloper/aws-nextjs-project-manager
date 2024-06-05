import { NavigationItem } from "@/Interfaces";
import { urls } from "@/urls"
import PartialNavigation from "@/components/navigation/PartialNavigation"
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";

export default function RegularNavigation() {

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

    const navigationItems = navigationBase

    return (
    <section>
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
                {navigationItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link 
                            underline="hover"
                            className="w-full"
                            href={item.url}
                            size="lg"   
                        >
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    </section>
    )
}