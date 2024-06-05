"use client"

import { NavbarBrand, Link } from "@nextui-org/react";
import AppLogo from "@/components/logo/AppLogo"
import { urls } from "@/urls";

export default function StaticNavigation() {
    return (
        <>
            <NavbarBrand>
                <section className="w-16 mr-2">
                    <AppLogo />
                </section>
                <p className="font-bold text-inherit text-xl">
                    <Link className="text-inherit" href={urls.base}>
                        Javier Code
                    </Link>
                </p>
            </NavbarBrand>
        </>
    )
}