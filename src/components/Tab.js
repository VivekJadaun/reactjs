import React, { Component } from 'react';
import './Tab.css';
import SubTab from './SubTab';

class Tab extends Component {
  state = {
    currentClass : '',
  }

  tabClickHandler = (event) => {
    // let $tabHead = event.currentTarget;
    // // debugger
    // let $tab = $tabHead.closest('[data-behaviour="tab-item"]');
    // $tab.classList.toggle('active');
    // $tab.querySelector('[data-behaviour="tab-item-body"]').classList.toggle('d-none');
    
    // let $tabBody = $tabHead.('[data-behaviour="tab-item-header"]');
  }

  componentDidMount = () => {
    this.setState({
      currentClass : this.props.index === 0 ? 'active' : 'hidden',
    });
  }

  render() {
    return (
      <div className={ 'tab list-group-item w-100 ' + this.state.currentClass} data-behaviour={ 'tab-item-' + this.props.index }>

        <div className="text-left list-group-header" data-behaviour={ 'tab-item-' + this.props.index + '-header'} onClick={ this.tabClickHandler }>
          <buttton className="list-group-item-action btn btn-light">
            <h3>{ this.props.name }</h3>
          </buttton>
        </div>

        <div id={ 'item-' + this.props.index } className="d-flex w-100 justify-content-between" data-behaviour={ 'tab-item-' + this.props.index + '-body'}>
          <div className="list-group w-100">
            { 
              this.props.subTabs.map((subTab, index) => {
                return <SubTab name={ subTab.name } content={ subTab.content } key={ index } index={ index } p_index={ this.props.index }></SubTab>
              }) 
            }
          </div>
        </div>

      </div>
    )
  }
}

export default Tab