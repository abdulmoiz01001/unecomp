import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import StoreProvider from "./StoreProvider";
import Drawar from "@/components/DrawerComp";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "UneComp BEST ELECTRONIC COMPONENTS IN PAKISTAN",
    template: "%s - UneComp BEST ELECTRONIC COMPONENTS IN PAKISTAN",
  },
  description:
    "Shop a wide range of high-quality electronic components, including transistors, capacitors, resistors, and more. Perfect for hobbyists, students, engineers, and manufacturers. Fast shipping and competitive prices!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager script in head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N75Z8HBK');`,
          }}
        />
      </Head>

      <body className={inter.className}>
        {/* Google Tag Manager noscript in body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N75Z8HBK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <StoreProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
