import { ReactNode } from "react";
import NavBar from "../components/NavBar";
import { jakartaSans, crimson_pro, jetbrains_mono } from "./fonts";
import './globals.css'

interface LayoutProps {
   children: ReactNode;
}

export const metadata = {
   title: {
      default: 'Indie Gamer',
      template: '%s | Indie Gamer'
   }
}

export default function RootLayout({ children }: LayoutProps) {
   return (
      <html lang="en" className={`${jakartaSans.variable} ${jetbrains_mono.variable} ${crimson_pro.variable}`} >
         <body className="bg-orange-50 flex flex-col px-8 py-2 min-h-screen">
            <header>
               <NavBar />
            </header>
            <main className="grow py-3">
               {children}
            </main>
            <footer className="text-center text-xs border-t py-3">
               Game data and images courtesy
                of <a 
                href="https://rawg.io"
                target="_blank"
                className="text-orange-800 hover:underline"
                >RAWG</a>
            </footer>
         </body>
      </html>
   );
}