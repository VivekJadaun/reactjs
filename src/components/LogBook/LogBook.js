import React, { Component } from 'react';
import './LogBook.css';
import Utility from '../../Helpers/Utility';

class LogBook extends Component {
  render() {
    const {logs} = this.props;
    logs.reverse();

    if(logs.length) {
      return (
        <div className="mt-5 h-50 bg-dark fs-6 fw-bold">
          <ul className="list-group list-group-flush text-dark gap-2">{
            logs.map((msg) => {
              const key = Utility.convertToUniqueHash(msg);

              return <li className="text-primary list-group-item small-list-item list-group-item-dark text-uppercase" key={ key }>{ msg }</li>
            })
          }</ul>
        </div>
      );
    } else {
      return (
        <div className="mt-5 h-50 bg-dark text-uppercase fs-2 d-flex align-items-center w-100 justify-content-md-center ">
          No moves yet
        </div>
      );
    }
  }
}


export default LogBook;