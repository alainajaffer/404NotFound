"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { DateTime } from 'luxon';
import { c2mChart } from 'chart2music';
import numeral from 'numeral';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, HStack, VStack, Text, Card, CardBody, Box, useBreakpointValue } from '@chakra-ui/react';
import TrendEmojis from './trend';

// Register the necessary Chart.js components
Chart.register(...registerables);

const colorPalettes = {
  default: 'blue',
  deuteranopia: 'red',
  protanopia: 'green',
  tritanopia: 'purple',
};

const BitcoinChart = () => {
  const canvasRef = useRef(null);
  const ccRef = useRef(null);
  const chartRef = useRef(null);
  const [textSize, setTextSize] = useState(20);
  const [color, setColor] = useState(colorPalettes.default);
  const data = [47686.81, 47345.22, 46458.12, 45897.57, 43569, 43160.93, 41557.9, 41733.94, 41911.6, 41821.26, 42735.86, 43949.1, 42591.57, 43099.7, 43177.4, 43113.88, 42250.55, 42375.63, 41744.33, 40680.42, 36457.32, 35030.25, 36276.8, 36654.33, 36954, 36852.12, 37138.23, 37784.33, 38138.18, 37917.6, 38483.13, 38743.27, 36952.98, 37154.6, 41500.88, 41441.16, 42412.43, 43840.29, 44118.45, 44338.8, 43565.11, 42407.94, 42244.47, 42197.52, 42586.92, 44575.2, 43961.86, 40538.01, 40030.98, 40122.16, 38431.38, 37075.28, 38286.03, 37296.57, 38332.61, 39214.22, 39105.15, 37709.79, 43193.23, 44354.64, 43924.12, 42451.79, 39137.61, 39400.59, 38419.98, 38062.04, 38737.27, 41982.93, 39437.46, 38794.97, 38904.01, 37849.66, 39666.75, 39338.79, 41143.93, 40951.38, 41801.16, 42190.65, 41247.82, 41078, 42358.81, 42892.96, 43960.93, 44348.73, 44500.83, 46820.49, 47128, 47465.73, 47062.66, 45538.68, 46281.64, 45868.95, 46453.57, 46622.68, 45555.99, 43206.74, 43503.85, 42287.66, 42782.14, 42207.67, 39521.9, 40127.18, 41166.73, 39935.52, 40553.46, 40424.48, 39716.95, 40826.21, 41502.75, 41374.38, 40527.36, 39740.32, 39486.73, 39469.29, 40458.31, 38117.46, 39241.12, 39773.83, 38609.82, 37714.88, 38469.09, 38529.33, 37750.45, 39698.37, 36575.14, 36040.92, 35501.95, 34059.27, 30296.95, 31022.91, 28936.36, 29047.75, 29283.1, 30101.27, 31305.11, 29862.92, 30425.86, 28720.27, 30314.33, 29200.74, 29432.23, 30323.72, 29098.91, 29655.59, 29562.36, 29267.22, 28627.57, 28814.9, 29445.96, 31726.39, 31792.31, 29799.08, 30467.49, 29704.39, 29832.91, 29906.66, 31370.67, 31155.48, 30214.36, 30112, 29083.8, 28360.81, 26762.65, 22487.39, 22206.79, 22572.84, 20381.65, 20471.48, 19017.64, 20553.27, 20599.54, 20710.6, 19987.03, 21085.88, 21231.66, 21502.34, 21027.29, 20735.48, 20280.63, 20104.02, 19784.73, 19269.37, 19242.26, 19297.08, 20231.26, 20190.12, 20548.25, 21637.59, 21731.12, 21592.21, 20860.45, 19970.56, 19323.91, 20212.07, 20569.92, 20836.33, 21190.32, 20779.34, 22485.69, 23254.42];
  useEffect(() => {
    const title = "Bitcoin price";

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: title,
          backgroundColor: color,
          borderColor: color,
          hoverRadius: 10,
          data: data.map((value, index) => {
            return {
              x: DateTime.fromISO('2022-01-01').plus({ days: index }).toLocaleString({ month: 'long', day: 'numeric' }),
              y: value
            };
          })
        }]
      },
      options: {
        plugins: {
          title: {
            text: title,
            display: true,
            font: {
              size: textSize,
            },
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Price',
              font: {
                size: textSize,
              },
            }
          },
          x: {
            type: 'category',
            labels: data.map((_, index) => DateTime.fromISO('2022-01-01').plus({ days: index }).toLocaleString({ month: 'long', day: 'numeric' })),
            title: {
              display: true,
              text: 'Date',
              font: {
                size: textSize,
              },
            }
          }
        }
      }
    });

    const { err } = c2mChart({
      type: 'line',
      title,
      element: canvasRef.current,
      cc: ccRef.current,
      axes: {
        x: {
          label: 'Day',
          format: index => DateTime.fromISO('2022-01-01').plus({ days: index }).toLocaleString({ month: 'long', day: 'numeric' })
        },
        y: {
          label: 'Price',
          format: value => numeral(value).format('$0,0')
        }
      },
      data: data.map((value, index) => ({
        x: index,
        y: value
      })),
      options: {
        onFocusCallback: ({ index }) => {
          chartRef.current.setActiveElements([{ datasetIndex: 0, index }]);
          chartRef.current.update();
        }
      }
    });

    if (err) {
      console.error(err);
    }
  }, [textSize, color, data]);

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Card shadow="lg" mb="40px" p={{ base: "10px", md: "20px" }} variant="outline" width="100%" maxW="1200px">
      <CardBody>
        <Box display={{ base: "block", md: "flex" }} alignItems="start">
          <Box flex="1">
            <canvas id="canvas" ref={canvasRef} className="w-full h-auto"></canvas>
          </Box>
          <VStack align="start" spacing={4} mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 4 }} width={{ base: "100%", md: "auto" }}>
            <Text fontSize="md" fontWeight="bold">INSIGHTS</Text>
            <TrendEmojis data={data} />
          </VStack>
        </Box>
        <Box className="controls w-full mt-5">
          <VStack spacing={4} align="stretch" width="full">
            <Text fontSize="md" fontWeight="bold">CONFIGURATIONS</Text>
            <Text fontSize="xs">Text Size</Text>
            <Slider defaultValue={20} min={8} max={24} step={1} onChange={(val) => setTextSize(val)}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb sx={{ borderWidth: "2px", borderColor: "black" }} />
            </Slider>
            <Text fontSize="xs">Color Palette</Text>
            <HStack spacing={4} wrap="wrap">
              <Button onClick={() => setColor(colorPalettes.default)}>Default</Button>
              <Button onClick={() => setColor(colorPalettes.deuteranopia)}>Deuteranopia</Button>
              <Button onClick={() => setColor(colorPalettes.protanopia)}>Protanopia</Button>
              <Button onClick={() => setColor(colorPalettes.tritanopia)}>Tritanopia</Button>
            </HStack>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default BitcoinChart;
