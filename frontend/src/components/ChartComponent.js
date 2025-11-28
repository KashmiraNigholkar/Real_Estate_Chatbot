import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ChartComponent({ chartData }){
  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      tension: 0.3,
      fill: false,
    }))
  };
  return <div style={{maxWidth: '900px'}}><Line data={data} /></div>;
}
