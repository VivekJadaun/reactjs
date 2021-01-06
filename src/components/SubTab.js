import React, { Component } from 'react';

class SubTab extends Component {
  render() {
    return (
      <div className="accordion-item">
        <div className="text-left accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={ '#collapsable-' + this.props.p_index + this.props.index } aria-expanded="true" aria-controls="collapsable">
            <h3>{ this.props.name }</h3>
          </button>
        </div>
        <div id={ 'collapsable-' + this.props.p_index + this.props.index } className="accordion-collapse collapse ">
          <div className="accordion-body">
            { this.props.content }
          </div>
        </div>
      </div>
    )
  }
}

export default SubTab;