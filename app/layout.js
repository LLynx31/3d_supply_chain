'use client'

import { Poppins } from 'next/font/google';
import "./globals.css"
import Footer from "./ui/footer";
import Header from './ui/header';



//image


//const poppins = Poppins({subsets: ['latin'], weight:['100','200','300','400','500','600','700','800','900']})

const poppins = Poppins({subsets: ['latin'], weight:['400','200']})



export default function RootLayout({ children }) {


  return (
    <html lang="fr">
      
      <body className={`${poppins.className } bg-white antialiased`} >

        {children}

      </body>
      
    
    </html>
  );
}
