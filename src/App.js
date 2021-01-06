import React from 'react';
import './App.css';
import Tab from './components/Tab';

class App extends React.Component {
  state = {
    tabs: [
      {
        name: 'introduction',
        subTabs: [
          { name: 'what is react.js',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          { name: 'getting started',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        ]
      },
      {
        name: 'the instance',
        subTabs: [
          { name: 'creating a instance',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          { name: 'data and methods',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          { name: 'instance lifecycle hooks',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        ]
      },
      {
        name: 'list rendering',
        subTabs: [
          { name: 'mapping an array to elements',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
        ]
      },
    ],
    currentTab: 0,
    currentSubTab: 0, 
  }

  componentDidMount = () => {
    document.querySelector(`[data-behaviour="tab-item-${this.state.currentTab}"]`).classList.toggle('active');
    document.querySelector(`[data-behaviour="subtab-item-${this.state.currentSubTab}"]`).classList.toggle('active');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="navbar navbar-light bg-dark text-white text-center ps-3 navbar-fixed-top">Exercise 1 : Tabs & SubTabs</div>

          <div className="container-fluid mt-5">

            <div className="list-group"> {
              this.state.tabs.map((tab, index) => {
                return (
                  <Tab name={ tab.name } subTabs={ tab.subTabs } className="" index={ index } key={ index }></Tab>
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
