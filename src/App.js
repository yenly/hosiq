import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: null
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const apiURL = `https://private-66479-hospiqtest.apiary-mock.com/units`;
      try {
        const response = await fetch(apiURL);
        const hosiqData = await response.json();
        // store in state once json promise returns value
        this.setState({
          units: hosiqData
        })
      }
      catch(err) {
        console.error(`Error: ${err.message}`);
      }
    }
    fetchData();
  }

  render() {
    if(!this.state.units) {
      return <div>API Data Loading...</div>
    }

    const units = this.state.units;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HospitalIQ</h2>
        </div>
        <div className='container'>
          <table className='units_table'>
            <thead>
              <tr>
                <th className='unit_name'>Units Name</th>
                <th>Census</th>
                <th>Capacity</th>
                <th>High Alarm</th>
                <th>Low Alarm</th>
              </tr>
            </thead>
            <tbody>
              {units.map(unit => {
                return (
                  <tr key={unit.id}>
                    <td className='unit_name'>{unit.name}</td>
                    <td>{unit.census}</td>
                    <td>{unit.capacity}</td>
                    <td>{unit.highAlarm === null ? `-` : unit.highAlarm}</td>
                    <td>{unit.lowAlarm === null ? `-` : unit.lowAlarm}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
