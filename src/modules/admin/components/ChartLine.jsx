import React from 'react';
import { Chart } from 'react-google-charts';

function OrderLineChart({ data }) {
  // Prepare the chart data
  const chartData = [['Month', 'Pending', 'In Progress', 'Completed', 'Return']];

  Object.keys(data).forEach((month) => {
    const { pending, in_progress, completed, return: returnCount } = data[month];
    chartData.push([month, pending, in_progress, completed, returnCount]);
  });

  const options = {
    title: 'Orders by Month',
    hAxis: {
      title: 'Month',
    },
    vAxis: {
      title: 'Count',
    },
    series: {
      0: { color: 'blue' },       // Color for "Pending"
      1: { color: 'orange' },     // Color for "In Progress"
      2: { color: 'green' },      // Color for "Completed"
      3: { color: 'red' },        // Color for "Return"
    },
  };

  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      options={options}
      width="100%"
      height="100%"
      />
  );
}

export default OrderLineChart;