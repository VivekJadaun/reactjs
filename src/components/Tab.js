import React, { Component } from 'react';
import './Tab.css';
import SubTab from './SubTab';

class Tab extends Component {
  render() {
    return (
      <div className="tab accordion-item">
        <div className="text-left accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ '#collapsable-' + this.props.index } aria-expanded="false" aria-controls="collapsable">
            <h3>{ this.props.name }</h3>
          </button>
        </div>
        <div id={ 'collapsable-' + this.props.index } className="accordion-collapse collapse ">
          <div className="accordion-body">
            <div className="accordion">
              { 
                this.props.subTabs.map((subTab, index) => {
                  return <SubTab name={ subTab.name } content={ subTab.content } key={ index } index={ index } p_index={ this.props.index }></SubTab>
                }) 
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tab