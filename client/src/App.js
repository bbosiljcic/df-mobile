import React, { Component } from 'react';

import { apiTest } from './services/api';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null,
  }
  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }


  callBackendAPI = async () => {
    const response = await apiTest();
    const body = await response.data;

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p className="App-intro">{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App;
