import React from 'react';
import constants from '../constants';
import './Battleground.css';
import Player from '../Player/Player';
import PlayerMove from '../PlayerMove/PlayerMove';
import LogBook from '../LogBook/LogBook';
import Utility from '../../Helpers/Utility';

class Battleground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...constants.players,
      next_move       : constants.first_move,
      log_book        : [],
      is_customized   : false,
      versus_system   : false, 
    };

    this.baseState         = JSON.parse(JSON.stringify(this.state));
    this.moveRef           = React.createRef();
    this.userConfigFormRef = React.createRef();
    this.playerMoveRefs    = {};
  }

  userConfigFormHandler = (event) => {
    event.preventDefault();

    const player_1_name = this.userConfigFormRef.current['first_player_name'].value;
    const player_2_name = this.userConfigFormRef.current['second_player_name'].value;
    const versus_system = !!this.userConfigFormRef.current['versus'].value;

    this.initiate(player_1_name, player_2_name, versus_system);
  }

  initiate = (player_1_name, player_2_name, versus_system) => {
    const {player_1_moves, player_2_moves} = this.distributeLuckyMoves();
    let newState                           = JSON.parse(JSON.stringify(this.state));
    newState.player_1.display_name         = player_1_name;
    newState.player_2.display_name         = player_2_name;
    newState.player_1.moves                = player_1_moves;
    newState.player_2.moves                = player_2_moves;
    newState.versus_system                 = versus_system;
    newState.is_customized                 = true;
    newState.next_move                     = constants.first_move;

    this.setState(newState);
  }

  distributeLuckyMoves = () => {
    const luckyMoves   = [...constants.lucky_moves];
    let player_1_moves = this.state.player_1.moves;
    let player_2_moves = this.state.player_2.moves;
    let toss           = 0;

    luckyMoves.forEach((move) => {
      toss = Utility.randomBetween(0, 1, true);

      toss ? player_1_moves.push(move) : player_2_moves.push(move);
    });

    return {
      player_1_moves: player_1_moves,
      player_2_moves: player_2_moves,
    };
  }


  executePlayerMove = (move_by, damage, self_effect) => {
    const next_move  = this.getNextPlayerKey();
    let new_log_book = [...this.state.log_book];
    let player       = JSON.parse(JSON.stringify(this.state[move_by]));
    let opponent     = JSON.parse(JSON.stringify(this.state[next_move]));

    if (self_effect) {
      player.health = player.health - damage;
      const latest_move_log = `${player.display_name} heals for ${Math.abs(damage)}`;

      // If healing increases health more than max limit
      player.health = (player.health > player.max_health) ? player.max_health : player.health;

      new_log_book.push(latest_move_log);

      this.setState({
        [move_by] : player,
        next_move : player.health ? next_move : null,
        log_book  : new_log_book,
      });
    } else {
      opponent.health = opponent.health - damage;
      const latest_move_log = `${player.display_name} hits ${opponent.display_name} for ${damage}`;

      new_log_book.push(latest_move_log);

      opponent.health = opponent.health < 0 ? 0 : opponent.health;

      this.setState({
        [next_move] : opponent,
        next_move   : opponent.health ? next_move : null,
        log_book    : new_log_book,
      });
    }
  }

  getNextPlayerKey = () => {
    return this.state.next_move === constants.first_player_key ? constants.second_player_key : constants.first_player_key;
  }


  gameOver = (msg, loser_name, delay = constants.opponent_move_delay_in_ms) => {
    window.alert(`${loser_name} ${msg}`);
    const resetGame = this.setState(JSON.parse(JSON.stringify(this.baseState)));
    setTimeout(resetGame, delay);
  }


  componentDidUpdate = () => {
    const {player_1, player_2} = this.state;

    if (player_1.health <= 0) {
      return this.gameOver(constants.game_over_msg, player_2.display_name);
    }

    if (player_2.health <= 0) {
      return this.gameOver(constants.game_over_msg, player_1.display_name);
    }
  }


  renderPlayers() {
    const {player_1, player_2, next_move} = this.state;

    return (
      <React.Fragment>
        <Player 
          key           = { player_1.name }
          display_name  = { player_1.display_name }
          max_health    = { player_1.max_health }
          health        = { player_1.health }
          indicate_turn = { next_move === player_1.name }>
        </Player>
        <Player 
          key           = { player_2.name }
          display_name  = { player_2.display_name }
          max_health    = { player_2.max_health }
          health        = { player_2.health }
          indicate_turn = { next_move === player_2.name }>
        </Player>
      </React.Fragment>
    );
  }


  renderPlayerMoves() {
    const {player_1, player_2, next_move} = this.state;
    const next_system_move = this.state.versus_system ? this.getRandomMove(this.state.player_2.moves) : null;

    const player_1_moves = player_1.moves.map((move) => {
      const disabled = this.checkMoveAvailability(player_1, move);
      const is_randomly_selected_move = (move.name === next_system_move?.name) ? true : false;
      const auto_execute = !disabled && next_move && is_randomly_selected_move;


      return (<PlayerMove 
        {...move} 
        key = { `player_1_${ move.name }` }
        player = { this.state.player_1.name }
        player_name = { this.state.player_1.display_name }
        gameOver = { this.gameOver }
        executePlayerMove = { this.executePlayerMove }
        disabled = { disabled }
        auto_execute = { auto_execute }
        next_move = { next_move }>
      </PlayerMove>);
    });

    const player_2_moves = player_2.moves.map((move) => {
      const disabled = this.checkMoveAvailability(player_2, move);
      const is_randomly_selected_move = (move.name === next_system_move?.name) ? true : false;
      const auto_execute = !disabled && next_move && is_randomly_selected_move;

      return (<PlayerMove 
        {...move}
        key = { `player_2_${ move.name }` }
        player = { this.state.player_2.name }
        player_name = { this.state.player_2.display_name }
        gameOver = { this.gameOver }
        executePlayerMove = { this.executePlayerMove }
        disabled = { disabled }
        auto_execute = { auto_execute }
        next_move = { next_move }>
      </PlayerMove>);
    });

    return (
      <React.Fragment>
        <div className="container-fluid d-grid align-items-center gap-2 col-md-6">{
          player_1_moves
        }</div>
        <div className="container-fluid d-grid align-items-center gap-2 col-md-6">{
          player_2_moves
        }</div>
      </React.Fragment>
    );
  }

  getRandomMove = (player_moves) => {
    return player_moves[Utility.randomBetween(0, player_moves.length - 1, true)];
  }

  checkMoveAvailability = (player, move) => {
    const {special_attack, special_attack_limit_perc, heal} = constants;

    if (player.name !== this.state.next_move) {
      return true;
    }

    let disabled = false;

    if (move.name === special_attack) {
      const player_health_perc = player.health * 100 / player.max_health;
      disabled = player_health_perc <= special_attack_limit_perc;
    }

    if (move.name === heal) {
      const player_health_perc = player.health * 100 / player.max_health;
      disabled = player_health_perc === 100;
    }

    return disabled;
  }

  renderBattleground() {
    return (
      <div className="container border border-dark border-4 py-2 my-2">
        <div className="d-flex row justify-content-md-center col-md-10 offset-md-1">{
          this.renderPlayers()
        }</div>

        <div className="d-flex flex-row gap-3 justify-content-md-center col-md-10 offset-md-1 mt-5" ref={ this.moveRef }>{
          this.renderPlayerMoves()
        }</div>

        <div className="container">
          <LogBook logs={ this.state.log_book }></LogBook>
        </div>

      </div>
    );
  }

  renderUserConfigForm() {
    const {player_1, player_2} = this.state;

    return (
      <div className="container bg-dark text-start fs-6">
        <form className="row g-3 px-2 py-2 " onSubmit={this.userConfigFormHandler} ref={this.userConfigFormRef}>
          <div className="col-md-6">
            <label htmlFor="first_player" className="form-label">First Player Name</label>
            <input type="text" className="form-control" name="first_player_name" defaultValue={player_1.display_name} aria-describedby="first_player" autoFocus/>
          </div>
          <div className="col-md-6">
            <label htmlFor="second_player" className="form-label">Second Player Name</label>
            <input type="text" className="form-control" name="second_player_name" defaultValue={player_2.display_name} aria-describedby="second_player" />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="versus" id="vs_computer" value="1" defaultChecked/>
            <label className="form-check-label" htmlFor="vs_computer">
              Play against Computer
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="versus" value="" id="vs_human" />
            <label className="form-check-label" htmlFor="vs_human">
              Play against Another Person
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form> 
      </div>
    );
  }

  render() {
    return this.state.is_customized ? this.renderBattleground() : this.renderUserConfigForm();
  }
}

export default Battleground;