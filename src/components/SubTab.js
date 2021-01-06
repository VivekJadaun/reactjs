import React, { Component } from 'react';

class SubTab extends Component {
  render() {
    return (
      <div className="list-group-item " data-behaviour={ 'subtab-item-' + this.props.index }>
        <div className="text-left">
          <a href='#' className="list-group-item-action" >
            <h4>{ this.props.name }</h4>
          </a>
        </div>

        <div id={ 'item-' + this.props.p_index + this.props.index } className="d-flex w-100 justify-content-between">
          <p className="">
            { this.props.content }
          </p>
        </div>
      </div>
    )
  }
}

export default SubTab;