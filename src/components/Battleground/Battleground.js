import React from 'react';
import constants from './constants';
import Player from '../Player/Player';

class Battleground extends React.Component {
  state = {
    ...constants,
  }

  render() {
    return (
      <div className="container-fluid col-md-10 offset-md-1">{
        this.state.players.map((player) => {
          return <Player key={ player.name } display_name={ player.display_name } health={ player.health } mode={ player.mode }></Player>
        })
      }</div>
    );
  }
}

export default Battleground;