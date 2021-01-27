import React from 'react';
import './App.css';
import Battleground from './components/Battleground/Battleground';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Battleground></Battleground>
        </header>
      </div>
    );
  }
}

export default App;
