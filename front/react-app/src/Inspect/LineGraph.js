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
            Object.entries(response.data["data"]).forEach(([key, value]) => {
              labels.push(key);
              values.push(value);
            });

            this.data = {
              labels: labels,
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
                  data: values
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
          <div style={{width: "80%"}}>
            <h2>Anomaly Functions Line Graph</h2>
            <Line 
              ref="chart"
              data={this.data}
              height={120} />
          </div>
          :
          <br/>
          }
      </div>
    );
  }
}
