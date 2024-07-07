"use client"
import GraphScreenshot from "./graph";
import NavBar from "./navBar"
import { Flex } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <NavBar />
          <GraphScreenshot />
    </ChakraProvider>
  );
}