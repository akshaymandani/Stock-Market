import React from 'react';
import { Line } from '@ant-design/charts';

const VolumeChart = ({ data }) => {
  // Destructure data from the API
  const { t, v, c } = data; // Note: "c" is for "closing price", not "C"

  // Convert timestamps to readable dates and prepare data for the chart
  const chartData = t.map((timestamp, index) => ({
    time: new Date(timestamp * 1000).toLocaleDateString(),
    volume: c[index],
    prize: c[index], // Correct casing for the closing price (should be "c")
  }));

  // Ant Design Charts configuration
  const config = {
    data: chartData,
    xField: 'time',
    yField: 'volume', // Primary Y-axis field for volume
    smooth: true,
    point: {
      size: 5,
      shape: 'circle',
    },
    tooltip: {
      showMarkers: true,
      formatter: (datum) => ({
        name: 'Volume/Price',
        value: `Volume: ${datum.volume}, Price: ${datum.prize}`,
      }),
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    xAxis: {
      title: {
        text: 'Time (Date)',
      },
    },
    yAxis: {
      title: {
        text: 'Volume',
      },
    },
  };

  return <Line {...config} />;
};

export default VolumeChart;
