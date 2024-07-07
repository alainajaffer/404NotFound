"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import BitcoinChart from "./bitCoinGraph";
import { Button, Select, VStack, HStack, Card, CardBody, Text, Box } from "@chakra-ui/react";
import { HelpCircle, Play, Pause, BookOpen } from "react-feather";
import TrendEmojis from './trend';
import Chatbot from "./chatbot";

const GraphScreenshot = () => {
  const graphRef = useRef(null);
  const [level, setLevel] = useState("");
  const [text, setText] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const captureScreenshot = () => {
    if (level) {
      html2canvas(graphRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        axios
          .post("/api/explainGraph", { imgData, level: level })
          .then((response) => {
            setText(response.data.explanation);
            setShowExplanation(true);
          })
          .catch((error) => {
            console.error(
              "Error uploading image:",
              error.response ? error.response.data : error.message
            );
          });
      });
    }
  };

  const handleTextToVoice = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleStopVoice = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  return (
    <VStack width="90%" alignItems="center" pt="80px" ml="6vw" mb="120px">
      <Box>
        <div ref={graphRef} id="graph-container">
          <BitcoinChart />
        </div>
      </Box>
      <HStack width="80%" justifyContent="space-between">
        <HStack>
          <Text fontWeight="light">Select explanation level:</Text>
          <Select placeholder=" " size="sm" value={level} onChange={handleChange} width="auto">
            <option value="child">Child</option>
            <option value="teen">Teen</option>
            <option value="university">University Student</option>
            <option value="graduate">Graduate</option>
            <option value="expert">Expert</option>
          </Select>
          <Button bgColor="#FFFFFF" p="0">
            <HelpCircle strokeWidth="1px" />
          </Button>
        </HStack>
        <HStack>
          <Button fontWeight="light" isDisabled={level === ""} onClick={captureScreenshot} bgColor="#F6EFA6" width="auto" shadow="md">
            Explain
          </Button>
          <Button isDisabled={level === ""} onClick={handleTextToVoice} bgColor="#B8EF25" px="1px" shadow="md">
            <Play strokeWidth="1.5px" />
          </Button>
          <Button isDisabled={level === ""} onClick={handleStopVoice} colorScheme="red" px="1px" shadow="md">
            <Pause strokeWidth="1.5px" />
          </Button>
        </HStack>
      </HStack>
      {showExplanation ? (
        <Card width="85%" shadow="md" mt="50px" variant="outline">
          <CardBody p="30px">
            <HStack>
              <BookOpen strokeWidth="1.5px" mt="0px" />
              <Text mb="10px" fontWeight="normal" mt="9px">What this graph shows:</Text>
            </HStack>
            <Text fontWeight="light" mt="25px">{text}</Text>
          </CardBody>
        </Card>
      ) : (
        <Text mt="80px" fontWeight="light">Select an explanation level and press &apos;Explain&apos; to reveal more...</Text>
      )}
      <Chatbot />
    </VStack>
  );
};


export default GraphScreenshot;
