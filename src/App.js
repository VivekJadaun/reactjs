import React from 'react';
import './App.css';
import Tab from './components/Tab/Tab';
import constants from './constants.js';

class App extends React.Component {
  state = {
    ...constants,
    activeTab: 0,
    defaultSubTab: 0, 
  }

  tabClickHandler = (event) => {
    let $tab = event.target.closest('[data-behaviour^="tab-item"]');

    this.setState({
      activeTab: parseInt($tab.getAttribute('data-id')),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="navbar navbar-light bg-dark text-white text-center ps-3 navbar-fixed-top">Exercise 1 : Tabs & SubTabs</div>

          <div className="container-fluid mt-5">

            <div className="list-group" > {
              this.state.tabs.map((tab, index) => {
                const { name, subTabs, id } = tab;

                return (
                  <Tab name={ name } subTabs={ subTabs } activeTab={ this.state.activeTab } activeSubTab={ this.state.defaultSubTab } index={ id } key={ id } tabClickHandler={ this.tabClickHandler }></Tab>
                )
              })
            } </div>

          </div>

        </header>
      </div>
    );
  }
}

export default App;
