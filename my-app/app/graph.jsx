"use client";
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import BitcoinChart from "./bitCoinGraph";
import { Button, Select } from "@chakra-ui/react";
import Image from "next/image";

const GraphScreenshot = () => {
  const graphRef = useRef();
  const [level, setLevel] = useState("");
  const [text, setText] = useState("")

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
    <div className="p-4 min-h-screen flex flex-col items-center">
      <div className="text-center font-press-start-2p text-4xl my-8">
        Sonic Sight
      </div>
      <div className="flex flex-col items-center w-full max-w-6xl">
        <div ref={graphRef} id="graph-container" className="h-[500px]">
          <BitcoinChart />
        </div>

        <div className="flex space-x-4 mt-4 w-full justify-center">
          <Select
            placeholder="Level"
            size="lg"
            value={level}
            onChange={handleChange}
            className="w-1/3"
          >
            <option value="child">Child</option>
            <option value="teen">Teen</option>
            <option value="university">University Student</option>
            <option value="graduate">Graduate</option>
            <option value="expert">Expert</option>
          </Select>
          <Button onClick={captureScreenshot} colorScheme="blue" className="w-1/5">
            Explain
          </Button>
          <Button onClick={handleTextToVoice} colorScheme="blue" className="w-1/5">
            🔊 Listen
          </Button>
          <Button onClick={handleStopVoice} colorScheme="red" className="w-1/5">
            ⏹ Stop
          </Button>
        </div>
        <div className="mt-4 w-full p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Explanation</h2>
          <p>{text}</p>
        </div>
        <Image
          className='mt-5'
          src="/image.png"
          width={500}
          height={500}
          alt="Sonic"
        />

      </div>
    </div>
  );
};

export default GraphScreenshot;
