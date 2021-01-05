import logo from './logo.svg';
import './App.css';
import Tab from './components/Tab';
import SubTab from './components/SubTab';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Tab name="introduction"></Tab>
        <Tab name="the instance"></Tab>
        <Tab name="list rendering"></Tab>
                
      </header>
    </div>
  );
}

export default App;
