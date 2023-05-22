"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { SiteContextProvider } from "@/context/SiteContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
      <SiteContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </SiteContextProvider>
      </body>
    </html>
  );
}
