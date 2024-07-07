import React from 'react'
import { Flex, Box, HStack, Text, Button } from '@chakra-ui/react'
import { Activity, User } from 'react-feather'
import Image from "next/image";

const NavBar = () => {
    return (
        <Flex py={14} px={5} height="50px" justifyContent="space-between" alignItems="center">
            <HStack pl={0} fontSize="22px">
                <Activity />
                <Text>SonicSight </Text>
                <Image
                    src="/image.png"
                    width={40}
                    height={40}
                    alt="Sonic"
                />
            </HStack>
            <HStack as="nav" spacing="40" justifyContent="center" ml="-90px">
                <Text color={"black"} fontWeight={"medium"} fontSize="16px" _hover={{ transform: "scale(1.03)" }} >
                    Data visualisation
                </Text>
                <Text color={"black"} fontWeight={"light"} fontSize="16px" textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                    About
                </Text>
                <Text color={"black"} fontWeight={"light"} fontSize="16px" textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                    Docs
                </Text>
            </HStack>
            <Box>
                <Button px="1px" bgColor="#FFFFFF">
                    {<User strokeWidth="1.5px" />}
                </Button>
            </Box>
        </Flex>
    )
}

export default NavBar;