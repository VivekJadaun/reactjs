import React, { Component } from 'react';
import './SubTab.css';

class SubTab extends Component {
  render() {
    let {index, p_index, name, activeSubTab, content, subTabClickHandler} = this.props;

    let data_behaviour = `subtab-item-${index}`;
    let content_id     = `item-${p_index}${index}`;
    let class_name     = `d-flex w-100 justify-content-between ${activeSubTab === index ? 'active' : 'hidden'}`;

    return (
      <div className="list-group-item " data-behaviour={ data_behaviour } data-id={ index } onClick={ subTabClickHandler }>
        <div className="text-left">
          <button className="list-group-item-action btn btn-light px-0 py-0 mx-0 my-0" >
            <h6>{ name }</h6>
          </button>
        </div>

        <div id={ content_id } className={ class_name }>
          <p className="text-black">
            { content }
          </p>
        </div>
      </div>
    )
  }
}

export default SubTab;