import React, { Component } from 'react';
import './Tab.css';
import SubTab from './SubTab';

class Tab extends Component {
  state = {
    activeSubTab: 0, 
  }

  subTabClickHandler = (event) => {
    let $subtab = event.target.closest('[data-behaviour^="subtab-item"]');

    this.setState({
      activeSubTab: parseInt($subtab.getAttribute('data-id')),
    });
  }

  componentDidUpdate = () => {
    if ((this.props.index !== this.props.activeTab) && (this.state.activeSubTab !== 0)) {
      this.setState({
        activeSubTab: 0,
      });
    }
  }

  render() {
    return (
      <div className="tab list-group-item w-100" data-behaviour={ 'tab-item-' + this.props.index } data-id={ this.props.index }>

        <div className="text-left list-group-header">
          <button className="list-group-item-action btn btn-light">
            <h3>{ this.props.name }</h3>
          </button>
        </div>

        <div id={ 'item-' + this.props.index } className={ 'd-flex w-100 justify-content-between ' + (this.props.activeTab === this.props.index ? 'active' : 'hidden') } >
          <div className="list-group w-100" onClick={ this.subTabClickHandler }>
            { 
              this.props.subTabs.map((subTab, index) => {
                return <SubTab name={ subTab.name } content={ subTab.content } key={ index } index={ index } p_index={ this.props.index } activeSubTab={ this.state.activeSubTab }></SubTab>
              }) 
            }
          </div>
        </div>

      </div>
    )
  }
}

export default Tab