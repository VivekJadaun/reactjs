import React, { Component } from 'react';

class Player extends Component {
  render() {
    const {name, display_name, health, mode} = this.props;

    return (
      <div className="card bg-light">
        <div className="w-100 display-2">{ display_name }</div>

        <div className="w-100 bg-success">{ health }</div>
      </div>
    );
  }
}

export default Player;