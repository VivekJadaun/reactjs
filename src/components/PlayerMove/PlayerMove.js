import React, { Component } from 'react';

class PlayerMove extends Component {
  render() {
    const {name, display_name, disabled, base_color, playerMoveHandler} = this.props;
    const style = { backgroundColor: base_color };


    return (
      <button type="button" className="btn btn-lg" value={ name } style={ style } disabled={ disabled } onClick={ playerMoveHandler }>
        { display_name }
      </button>
    );
  }
}

export default PlayerMove;