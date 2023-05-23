"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { SiteContextProvider } from "@/context/SiteContext";
import {Quicksand} from '@next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight : ['300','400','500','600','700']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={quicksand.className} >
      <SiteContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </SiteContextProvider>
      </body>
    </html>
  );
}
