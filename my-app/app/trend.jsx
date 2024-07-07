"use client"
import React from 'react';
import { Text, Circle } from '@chakra-ui/react';

const TrendEmojis = ({ data }) => {
  const getOverallTrendEmoji = () => {
    if (data.length < 2) return '➖';

    const startPrice = data[0];
    const endPrice = data[data.length - 1];

    if (endPrice > startPrice) {
      return '📈'; // Overall uptrend
    } else if (endPrice < startPrice) {
      return '📉'; // Overall downtrend
    } else {
      return '➖'; // No overall change
    }
  };

  return (
    <Circle size="100px" bg="gray.100">
      <Text fontSize="5xl">{getOverallTrendEmoji()}</Text>
    </Circle>
  );
};

export default TrendEmojis;
