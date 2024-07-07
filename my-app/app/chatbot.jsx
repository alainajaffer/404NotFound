import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Link,
  CloseButton,
  Avatar,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'How can I help you today?',
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    const newMessage = {
      text: inputValue,
      sender: 'user',
    };

    const botMessage = inputValue.toLowerCase().includes('sonification')
      ? {
        text: 'Interactive sonification is the use of sound to convey information and perceptualize data. It is important because it helps people understand data through auditory means, which can be particularly useful for those with visual impairments.',
        sender: 'bot',
      }
      : inputValue.toLowerCase().includes('color blindness') || inputValue.toLowerCase().includes('colour blindness')
        ? {
          text: `Color blindness affects how people perceive colors. Here are the main types:
Deuteranopia: Difficulty seeing green colors.
Protanopia: Difficulty seeing red colors.
Tritanopia: Difficulty seeing blue colors.
To make web applications accessible, use high contrast colors, avoid relying solely on color to convey information, and provide text labels or patterns.`,
          sender: 'bot',
        }
        : {
          text: "I don't know yet, but can I help you on any of these?",
          sender: 'bot',
          options: true,
        };

    setMessages([...messages, newMessage, botMessage]);
    setInputValue('');
  };

  const handleOptionClick = (option) => {
    const botMessage = {
      text:
        option === 'wcag'
          ? 'You can find more about WCAG 2.2 here: https://www.w3.org/TR/WCAG22/'
          : 'Using interactive sonification, the Sonic Sight package/API can assist your use cases. Making graphs connect to sound and having a transcription on varying levels and abilities as well as transcription and transcript of the graph data.',
      sender: 'bot',
      options: false,
    };
    setMessages([...messages, botMessage]);
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        colorScheme="blue"
        position="fixed"
        bottom="4"
        right="4"
        borderRadius="full"
      >
        Chat with us!
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          bottom="20"
          right="4"
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p="4"
          maxW="sm"
          maxH="70vh"
          overflow="hidden"
          zIndex="10"
        >
          <CloseButton
            position="absolute"
            top="2"
            right="2"
            onClick={() => setIsOpen(false)}
          />
          <VStack
            spacing={4}
            align="start"
            overflowY="auto"
            maxH="60vh"
            width="100%"
          >
            {messages.map((message, index) => (
              <HStack
                key={index}
                alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                spacing={2}
                width="100%"
              >
                {message.sender === 'bot' && (
                  <Avatar name="Chatbot" src="/tails.png" size="sm" />
                )}
                <Box
                  bg={message.sender === 'bot' ? 'gray.100' : 'blue.100'}
                  borderRadius="md"
                  p="3"
                  maxW="80%"
                >
                  <Text>{message.text}</Text>
                  {message.options && (
                    <VStack mt="4" spacing="2">
                      <Button
                        colorScheme="blue"
                        onClick={() => handleOptionClick('wcag')}
                        w="full"
                        whiteSpace="normal"
                      >
                        WCAG 2.2 Info
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleOptionClick('sonification')}
                        w="full"
                        whiteSpace="normal"
                      >
                        Presenting Data in a More Accessible Way
                      </Button>
                    </VStack>
                  )}
                </Box>
              </HStack>
            ))}
          </VStack>
          <InputGroup mt="4">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSend}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
