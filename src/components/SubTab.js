import React, { Component } from 'react';

class SubTab extends Component {
  render() {
    return (
      <div className="accordion-item" data-behaviour={ 'subtab-item-' + this.props.index } data-id={ this.props.index }>
        <div className="text-left accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={ '#collapsable-' + this.props.p_index + this.props.index } aria-expanded="true" aria-controls="collapsable">
            <h3>{ this.props.name }</h3>
          </button>
        </div>
        <div id={ 'collapsable-' + this.props.p_index + this.props.index } className={ 'accordion-collapse collapse ' + (this.props.activeSubTab === this.props.index ? 'show active' : '') }>
          <div className="accordion-body">
            { this.props.content }
          </div>
        </div>
      </div>
    )
  }
}

export default SubTab;