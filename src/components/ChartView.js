import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

function ChartView() {
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [10, 5, 2],
      backgroundColor: ['green', 'gray', 'red']
    }]
  };

  return (
    <div>
      <h3>Sentiment Overview</h3>
      <Pie data={data} />
    </div>
  );
}
export default ChartView;
