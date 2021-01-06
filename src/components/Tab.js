import React, { Component } from 'react';
import './Tab.css';
import SubTab from './SubTab';

class Tab extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     activeSubTab: 0,
  //   }
  // }

  subTabToggleHandler = (event) => {
    let $subtab = event.target.closest('[data-behaviour^="subtab-item"]');

    this.props.activeSubTab = parseInt($subtab.getAttribute('data-id'));
    // this.setState({
    //   activeSubTab: parseInt($subtab.getAttribute('data-id')),
    // });
  }

  // componentDidChange = () => {
  //   // console.log('[Tab.js] in shouldComponentUpdate');
  // // console.log(this.props.activeTab, this.props.index, this.props.activeTab !== this.props.index)
  //   if (this.props.activeTab !== this.props.index) {
  //     console.log('changing activeSubTab to 0');
  //     this.setState({
  //       activeSubTab: 0,
  //     });
      
  //   }

  //   // return true;
  // }

  render() {
    if ((this.props.activeTab !== this.props.index) && this.props.activeSubTab !== 0) {
      this.props.activeSubTab = 0;
    }

    return (
      <div className="tab accordion-item" data-behaviour={ 'tab-item-' + this.props.index } data-id={ this.props.index }>
        <div className="text-left accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={ '#collapsable-' + this.props.index } aria-expanded="false" aria-controls="collapsable">
            <h3>{ this.props.name }</h3>
          </button>
        </div>
        <div id={ 'collapsable-' + this.props.index } className={ 'accordion-collapse collapse ' + (this.props.activeTab === this.props.index ? 'show active' : '') }>
          <div className="accordion-body">
            <div className="accordion" onClick={ this.subTabToggleHandler }> {
                this.props.subTabs.map((subTab, index) => {
                  return <SubTab name={ subTab.name } content={ subTab.content } key={ index } index={ index } p_index={ this.props.index } activeSubTab={ this.props.activeSubTab }></SubTab>
                }) 
            } </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tab