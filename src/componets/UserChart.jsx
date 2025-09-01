'use client'
import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { label: "Ulug'bek", value: 400, color: '#0088FE' },
  { label: 'Muhammadsodiq', value: 300, color: '#00C49F' },
  { label: 'Abdulaiz', value: 300, color: '#FFBB28' },
  { label: 'Ixlosbek', value: 200, color: '#FF8042' },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}`;
};

export default function PieChartWithCustomizedLabel() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 90,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
