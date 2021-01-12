import React, { Component } from 'react';
import './Tab.css';
import SubTab from '../SubTab/SubTab';

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
    const {index, activeTab} = this.props;

    if ((index !== activeTab) && (this.state.activeSubTab !== 0)) {
      this.setState({
        activeSubTab: 0,
      });
    }
  }

  render() {
    const {index, name, activeTab, subTabs, tabClickHandler} = this.props;

    const data_behaviour = `tab-item-${index}`;
    const content_id     = `item-${index}`;
    const class_name     = `d-flex w-100 justify-content-between ${activeTab === index ? 'active' : 'hidden'}`;

    return (
      <div className="tab list-group-item w-100" data-behaviour={ data_behaviour } data-id={ index } onClick={ tabClickHandler }>

        <div className="text-left list-group-header">
          <button className="list-group-item-action btn btn-light">
            <h3>{ name }</h3>
          </button>
        </div>

        <div id={ content_id } className={ class_name } >
          <div className="list-group w-100" >
            { 
              subTabs.map((subTab, index) => {
                const { name, content, id } = subTab;

                return <SubTab name={ name } content={ content } key={ id } index={ id } p_index={ id } activeSubTab={ this.state.activeSubTab } subTabClickHandler={ this.subTabClickHandler }></SubTab>
              }) 
            }
          </div>
        </div>

      </div>
    )
  }
}

export default Tab