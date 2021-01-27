import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  render() {
    const {name, display_name, health, max_health, indicate_turn} = this.props;
    const style = { 
      width: `${health * 100 / max_health}%`,
    };

    const classes = `w-100  ${indicate_turn ? 'blink' : ''}`; 
    
    return (
      <div className="container-fluid col-md-6">
        <div className={ name }>
          <div className={ classes }>{ display_name }</div>


          <div className="progress position-relative h-30 mt-1">
            <div className="progress-bar bg-success" role="progressbar" style={ style }  aria-valuenow={ health } aria-valuemin="0" aria-valuemax={ max_health }>
              <div className="justify-content-center d-flex position-absolute w-100 fs-5 text-dark">{ health }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;