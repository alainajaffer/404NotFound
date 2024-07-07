import React, { useState } from 'react'
import {
    Flex, Box, HStack, Text, Button, useDisclosure, Drawer,
    DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, IconButton, VStack
} from '@chakra-ui/react'
import { Activity, User, Menu } from 'react-feather'
import Image from "next/image";

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = useState('left');

    return (
        <Flex py={{ base: 4, md: 14 }} px={{ base: 2, md: 5 }} height="50px" justifyContent="space-between" alignItems="center">
            <HStack pl={0} fontSize={{ base: '18px', md: '22px' }}>
                <Activity />
                <Text>SonicSight </Text>
                <Image
                    src="/image.png"
                    width={40}
                    height={40}
                    alt="Sonic"
                />
            </HStack>
            <HStack as="nav" spacing={{ base: 4, md: 10 }} justifyContent="center" display={{ base: 'none', md: 'flex' }}>
                <Text color={"black"} fontWeight={"medium"} fontSize={{ base: '14px', md: '16px' }} _hover={{ transform: "scale(1.03)" }}>
                    Data visualisation
                </Text>
                <Text color={"black"} fontWeight={"light"} fontSize={{ base: '14px', md: '16px' }} textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                    About
                </Text>
                <Text color={"black"} fontWeight={"light"} fontSize={{ base: '14px', md: '16px' }} textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                    Docs
                </Text>
            </HStack>
            <Box display={{ base: 'flex', md: 'none' }}>
                <IconButton
                    aria-label="Open Menu"
                    icon={<Menu />}
                    onClick={onOpen}
                />
            </Box>
            <Box display={{ base: 'none', md: 'block' }}>
                <Button px="1px" bgColor="#FFFFFF">
                    <User strokeWidth="1.5px" />
                </Button>
            </Box>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                    <DrawerBody>
                        <VStack align="start">
                            <Text color={"black"} fontWeight={"medium"} fontSize="16px" _hover={{ transform: "scale(1.03)" }}>
                                Data visualisation
                            </Text>
                            <Text color={"black"} fontWeight={"light"} fontSize="16px" textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                                About
                            </Text>
                            <Text color={"black"} fontWeight={"light"} fontSize="16px" textDecoration="none" _hover={{ transform: "scale(1.03)" }}>
                                Docs
                            </Text>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default NavBar;
