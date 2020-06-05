import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
export default class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized : false
    }
  }

  componentDidMount() {
    Axios.get("http://127.0.0.1:5000/get_anomaly_data", {
        params: {
          filename: this.props.filename
        }
    }).then((response) => {
        if (response.data == "error") {
            window.localStorage.setItem('error_message', "File not found error");
            window.location = "/error";
        } else {
            let labels = [];
            let values = [];
            let value_labels = [];
            let count = 0;
            Object.entries(response.data["data"]).forEach(([key, value]) => {
              labels.push(count++);
              value_labels.push(key);
              values.push(value);
            });

            this.data = {
              labels: labels,
              datasets: [
                {
                  label: 'Function Loss',
                  showLabel: false,
                  fill: true,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(192,75,108,0.4)',
                  borderColor: 'rgba(255,65,114,0.4)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(255,65,114)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(255,65,114,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: values,
                  data_label: value_labels
                }
              ]
            };
            if(labels.length != 0) {
              this.setState({initialized : true});
            }
        }
    });
  }

  render() {
    return (
      <div>
          {
          this.state.initialized?
          <div style={{width: "75%", margin: "0 auto"}}>
            <h2>Anomaly Functions Line Graph</h2>
            <Line
              ref="chart"
              options={{
                  legend: {
                      display: false
                  },
                  tooltips: {
                      mode: 'label',
                      callbacks: {
                          title: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index];
                          },
                          beforeLabel: function(tooltipItem, data) {
                            return 'Loss: ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                          },
                          label: function(tooltipItem, data) {
                            return 'Hash: ' + data.datasets[tooltipItem.datasetIndex].data_label[tooltipItem.index];
                          }
                      }
                  }
              }}
              data={this.data}
              height={80} />
          </div>
          :
          <br/>
          }
      </div>
    );
  }
}
