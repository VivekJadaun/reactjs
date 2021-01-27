import React from 'react';
import './App.css';
import Form from './components/Form/Form';

class App extends React.Component {
  render() {
    return (
      <div className="App App-header">
        <div className="container-fluid">
          <div className="col-md-6 offset-md-3">
            <div>
              <Form></Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
