import React, { Component } from 'react';
import './SubTab.css';

class SubTab extends Component {
  render() {
    return (
      <div className="list-group-item " data-behaviour={ 'subtab-item-' + this.props.index } data-id={ this.props.index }>
        <div className="text-left">
          <button className="list-group-item-action btn btn-light px-0 py-0 mx-0 my-0" >
            <h6>{ this.props.name }</h6>
          </button>
        </div>

        <div id={ 'item-' + this.props.p_index + this.props.index } className={ 'd-flex w-100 justify-content-between ' + (this.props.activeSubTab === this.props.index ? 'active' : 'hidden') }>
          <p className="text-black">
            { this.props.content }
          </p>
        </div>
      </div>
    )
  }
}

export default SubTab;