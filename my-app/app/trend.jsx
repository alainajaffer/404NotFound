"use client"
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

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
    <Box>
      <Text fontSize="xl" fontWeight="bold" className="mb-10 mt-4">Overall Trend</Text>
      <Text fontSize="7xl">{getOverallTrendEmoji()}</Text>
    </Box>
  );
};

export default TrendEmojis;
