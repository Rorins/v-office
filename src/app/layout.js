"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import {Nunito_Sans} from '@next/font/google'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight : ['300']
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={nunito.className} >
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
