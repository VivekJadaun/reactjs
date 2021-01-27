import React, { Component } from 'react';
import constants from '../constants';
import Utility from '../../Helpers/Utility';

class PlayerMove extends Component {
  constructor(props) {
    super(props);
    this.moveRef = React.createRef();
  }

  moveHandler = (event) => {
    const move_type  = event.target.value;
    const {min_damage, max_damage, self_effect, player, player_name} = this.props;

    if (move_type === constants.forfeit) {
      return this.props.gameOver(constants.forfeit_msg, player_name);
    }

    const damage = this.calculateDamage(min_damage, max_damage);
    this.props.executePlayerMove(player, damage, self_effect);
  }

  calculateDamage = (min_damage, max_damage) => {
    return Utility.randomBetween(min_damage, max_damage, true);
  }

  render() {
    const {name, display_name, disabled, base_color} = this.props;
    const style = { backgroundColor: base_color };


    return (
      <div className="">
        <button type="button" ref={ this.moveRef } className="btn btn-lg w-100" value={ name } style={ style } disabled={ disabled } onClick={ this.moveHandler }>
          { display_name }
        </button>
      </div>
    );
  }

  componentDidUpdate = () => {
    if (this.props.auto_execute && this.props.player === this.props.next_move) {
      setTimeout(() => this.moveRef.current.click(), constants.opponent_move_delay_in_ms);
    }
  }
}

export default PlayerMove;