import React from 'react';
import constants from './constants';
import './Battleground.css';
import Player from '../Player/Player';
import PlayerMove from '../PlayerMove/PlayerMove';
import LogBook from '../LogBook/LogBook';

const SPECIAL_ATTACK            = 'special_attack';
const HEAL                      = 'heal';
const SPECIAL_ATTACK_LIMIT_PERC = 90;
const OPPONENT_MOVE_DELAY_IN_MS = 1000;
const FORFEIT                   = 'forfeit';
const FIRST_MOVE                = 'player';

class Battleground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...constants,
    };

    this.moveRef         = React.createRef();
    this.playerMoveRefs  = {};

    this.state.opponent_health = this.state.opponent.max_health;
    this.state.player_health   = this.state.player.max_health;
    this.state.next_move       = FIRST_MOVE;
    this.state.log_book        = [];

    this.state.player_moves.forEach((move) => {
      this.playerMoveRefs[move.name] = React.createRef();
    });
  }


  playerMoveHandler = (event) => {
    const move_type  = event.target.value;

    if (move_type === FORFEIT) {
      return this.playerDefeated();
    }

    const move       = this.state.player_moves.find(move => move.name === move_type);
    const min_damage = move.min_damage;
    const max_damage = move.max_damage;
    const damage     = this.performMove(min_damage, max_damage);

    if (move.self_effect) {
      let new_player_health = this.state.player_health - damage;
      const latest_move_log = `${this.state.player.name} heals for ${Math.abs(damage)}`;
      let new_log_book      = this.state.log_book;

      // If healing increases health more than max limit
      new_player_health = (new_player_health > this.state.player.max_health) 
                          ? this.state.player.max_health 
                          : new_player_health;


      new_log_book.push(latest_move_log);

      this.setState({
        player_health : new_player_health,
        next_move     : this.state.opponent.name,
        log_book      : new_log_book,
      });
    } else {
      const new_opponent_health = this.state.opponent_health - damage;
      const latest_move_log     = `${this.state.player.name} hits ${this.state.opponent.name} for ${Math.abs(damage)}`;
      let new_log_book          = this.state.log_book;

      new_log_book.push(latest_move_log);

      this.setState({
        opponent_health : new_opponent_health,
        next_move       : this.state.opponent.name,
        log_book        : new_log_book,
      });
    }

    this.opponentMoveHandler();
  }


  opponentMoveHandler = (delay = OPPONENT_MOVE_DELAY_IN_MS) => {
    this.moveRef.current.classList.add('disabled-element')

    const damage            = this.performMove(this.state.opponent.min_attack, this.state.opponent.max_attack);
    const new_player_health = this.state.player_health - damage; 
    const latest_move_log   = `${this.state.opponent.name} hits ${this.state.player.name} for ${Math.abs(damage)}`;
    let timer               = null;
    let new_log_book        = this.state.log_book;


    const delayed_move = () => {
      this.moveRef.current.classList.remove('disabled-element');
      new_log_book.push(latest_move_log);
      
      this.setState({
        player_health : new_player_health,
        next_move     : this.state.player.name,
        log_book      : new_log_book,
      });

      clearTimeout(timer);
    }

    timer = setTimeout(delayed_move, delay);
  }


  performMove = (min_damage, max_damage) => {
    return Math.floor(Math.random() * (max_damage - min_damage + 1)) + min_damage;
  }


  playerDefeated = () => {
    this.setState({
      opponent_health : this.state.opponent.max_health,
      player_health   : this.state.player.max_health,
      log_book        : [],
    });

    window.alert('You have been defeated! Please Try Again');
  }


  componentDidMount = () => {
    if (FIRST_MOVE === this.state.opponent.name) {
      this.opponentMoveHandler();
    }
  }

  componentDidUpdate = () => {
    let timer = null;

    const health_check = () => {
      if (this.state.player_health <= 0) {
        return this.playerDefeated();
      }
      clearTimeout(timer);
    }

    timer = setTimeout(health_check, 1000);
  }

  render() {
    const {player, opponent, player_health, opponent_health} = this.state;

    return (
      <div className="container border border-dark border-4 py-2 my-2">
        <div className="d-flex row justify-content-md-center col-md-10 offset-md-1">
          <Player key={ player.name } display_name={ player.display_name } max_health={ player.max_health } health={ player_health } indicate_turn={ this.state.next_move === player.name }></Player>
          <Player key={ opponent.name } display_name={ opponent.display_name } max_health={ opponent.max_health } health={ opponent_health } indicate_turn={ this.state.next_move === opponent.name }></Player>
        </div>

        <div className="d-flex flex-row gap-3 justify-content-md-center col-md-10 offset-md-1 mt-5" ref={ this.moveRef }>{
          this.state.player_moves.map((move) => {
            let disabled = false;

            if (move.name === SPECIAL_ATTACK) {
              const player_health_perc = this.state.player_health * 100 / this.state.player.max_health;
              disabled = player_health_perc <= SPECIAL_ATTACK_LIMIT_PERC;
            }

            if (move.name === HEAL) {
              const player_health_perc = this.state.player_health * 100 / this.state.player.max_health;
              disabled = player_health_perc === 100;
            }

            return <PlayerMove key={ move.name } ref={ this.playerMoveRefs[move.name] } display_name={ move.display_name } name={ move.name } base_color={ move.base_color } playerMoveHandler={ this.playerMoveHandler } disabled={ disabled }></PlayerMove>
          })
        }</div>

        <div className="container"><LogBook logs={ this.state.log_book }></LogBook></div>

      </div>
    );
  }
}

export default Battleground;