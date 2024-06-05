import { Raleway } from "next/font/google";
import {NextUIProvider} from "@nextui-org/react";
import "./globals.css";
import React from "react";
import RegularNavigation from "./@regularnavigation/page";
import AuthNavigation from "./@authnavigation/page";
import { cookies } from "next/headers"
const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const cookieStore = cookies();
  const isAuth = cookieStore.get("isAuth")?.value;

  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={raleway.className}>
        <NextUIProvider>
          <section>
            {isAuth && JSON.parse(isAuth) ? <AuthNavigation /> : <RegularNavigation /> }
          </section>
          <main className="container mx-auto px-6">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
