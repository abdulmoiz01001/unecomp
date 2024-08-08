import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import StoreProvider from "./StoreProvider";
import Drawar from "@/components/DrawerComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: " Une Comp",
    template: " %s - Une Comp "
  },
  description: "MUET Students Projects Components Providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <StoreProvider>

        <ChakraProvider>
     
        {children}
        </ChakraProvider>
        </StoreProvider>
        
        </body>
    </html>
  );
}
