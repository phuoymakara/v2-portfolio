import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Portfolio | Makara",
  description: "A professionalism portfolio",
  generator: "v2",
  icons:{
    icon: 'https://i.pinimg.com/736x/18/e9/ac/18e9ac3999b64780b9b70218cad2ac9a.jpg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}
