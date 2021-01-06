import React, { Component } from 'react';
import './SubTab.css';

class SubTab extends Component {
  render() {
    return (
      <div className="list-group-item " data-behaviour={ 'subtab-item-' + this.props.index }>
        <div className="text-left" data-behaviour={ 'subtab-item-' + this.props.index + '-header'}>
          <button className="list-group-item-action btn btn-light px-0 py-0 mx-0 my-0" >
            <h4>{ this.props.name }</h4>
          </button>
        </div>

        <div id={ 'item-' + this.props.p_index + this.props.index } className="d-flex w-100 justify-content-between" data-behaviour={ 'subtab-item-' + this.props.index + '-body'}>
          <p className="text-black">
            { this.props.content }
          </p>
        </div>
      </div>
    )
  }
}

export default SubTab;