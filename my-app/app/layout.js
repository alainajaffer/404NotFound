import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sonic Sight",
  description: "See Hear Feel the Data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <ChakraProvider>
        <body className={inter.className}>{children}</body>
      </ChakraProvider>
    </html>
  );
}
