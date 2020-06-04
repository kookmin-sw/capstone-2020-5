import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [
    'Function-1', 'Function-2', 'Function-3', 'Function-4', 'Function-5',
    'Function-6', 'Function-7', 'Function-8', 'Function-9','Function-10'
  ],
  datasets: [
    {
      label: 'Function Loss',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5, 10, 80, 18, 95, 25, 10, 80, 30, 20]
    }
  ]
};

export default class LineDemo extends Component {
  render() {
    return (
      <div style={{width: "80%"}}>
        <h2>Line Example</h2>
        <Line 
          ref="chart"
          data={data}
          height={120} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}
