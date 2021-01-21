import React from 'react';
import constants from './constants';
import './Battleground.css';
import Player from '../Player/Player';
import PlayerMove from '../PlayerMove/PlayerMove';
import LogBook from '../LogBook/LogBook';

// const SPECIAL_ATTACK            = 'special_attack';
// const HEAL                      = 'heal';
// const SPECIAL_ATTACK_LIMIT_PERC = 90;
// const OPPONENT_MOVE_DELAY_IN_MS = 1000;
// const FORFEIT                   = 'forfeit';
// const FIRST_MOVE                = 'player';

class Battleground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opponent_health : constants.opponent.max_health,
      player_health   : constants.player.max_health,
      next_move       : constants.first_move,
      log_book        : [],
    };

    this.moveRef         = React.createRef();
    this.playerMoveRefs  = {};

    constants.player_moves.forEach((move) => {
      this.playerMoveRefs[move.name] = React.createRef();
    });
  }


  playerMoveHandler = (event) => {
    const move_type  = event.target.value;

    if (move_type === constants.forfeit) {
      return this.gameOver(constants.forfeit_msg);
    }

    const move       = constants.player_moves.find(move => move.name === move_type);
    const min_damage = move.min_damage;
    const max_damage = move.max_damage;
    const damage     = this.calculateDamage(min_damage, max_damage);

    if (move.self_effect) {
      let new_player_health = this.state.player_health - damage;
      const latest_move_log = `${constants.player.name} heals for ${Math.abs(damage)}`;
      let new_log_book      = this.state.log_book;

      // If healing increases health more than max limit
      new_player_health = (new_player_health > constants.player.max_health) 
                          ? constants.player.max_health 
                          : new_player_health;


      new_log_book.push(latest_move_log);

      this.setState({
        player_health : new_player_health,
        next_move     : constants.opponent.name,
        log_book      : new_log_book,
      }, this.opponentMoveHandler());
    } else {
      const new_opponent_health = this.state.opponent_health - damage;
      const latest_move_log     = `${constants.player.name} hits ${constants.opponent.name} for ${Math.abs(damage)}`;
      let new_log_book          = this.state.log_book;

      new_log_book.push(latest_move_log);

      this.setState({
        opponent_health : new_opponent_health < 0 ? 0 : new_opponent_health,
        next_move       : constants.opponent.name,
        log_book        : new_log_book,
      }, () => {
        console.log(latest_move_log);
        setTimeout(() => {
          this.state.opponent_health > 0 ? this.opponentMoveHandler() : this.gameOver(constants.victory_msg);
        }, 1000);
      });
    }
  }


  opponentMoveHandler = (delay = constants.opponent_move_delay_in_ms) => {
    this.moveRef.current.classList.add('disabled-element')

    const damage            = this.calculateDamage(constants.opponent.min_attack, constants.opponent.max_attack);
    const new_player_health = this.state.player_health - damage; 
    const latest_move_log   = `${constants.opponent.name} hits ${constants.player.name} for ${Math.abs(damage)}`;
    let new_log_book        = this.state.log_book;

    const delayed_move = () => {
      this.moveRef.current.classList.remove('disabled-element');
      new_log_book.push(latest_move_log);
      
      this.setState({
        player_health : new_player_health < 0 ? 0 : new_player_health,
        next_move     : constants.player.name,
        log_book      : new_log_book,
      }, () => {
        console.log(latest_move_log);
        setTimeout(() => {
          if (this.state.player_health <= 0) {
            this.gameOver(constants.defeat_msg);
          }
        }, 1000);
      });
    }

    setTimeout(delayed_move, delay);
  }


  calculateDamage = (min_damage, max_damage) => {
    return Math.floor(Math.random() * (max_damage - min_damage + 1)) + min_damage;
  }


  gameOver = (msg, delay = constants.opponent_move_delay_in_ms) => {
    const resetGame = this.setState((state) => {
      window.alert(msg);
      return {
        opponent_health : constants.opponent.max_health,
        player_health   : constants.player.max_health,
        log_book        : [],
      };
    });

    setTimeout(resetGame, delay);
  }


  componentDidMount = () => {
    if (constants.first_move === constants.opponent.name) {
      this.opponentMoveHandler(0);
    }
  }


  // componentDidUpdate = () => {
  //   const health_check = () => {
  //     if (this.state.player_health <= 0) {
  //       return this.gameOver(constants.defeat_msg);
  //     }

  //     if (this.state.opponent_health <= 0) {
  //       return this.gameOver(constants.victory_msg);
  //     }
  //   }

  //   setTimeout(health_check, 500);
  // }


  renderPlayers() {
    const {player, opponent} = constants;
    const {player_health, opponent_health, next_move} = this.state;

    return (
      <React.Fragment>
        <Player 
          key           = { player.name }
          display_name  = { player.display_name }
          max_health    = { player.max_health }
          health        = { player_health }
          indicate_turn = { next_move === player.name }>
        </Player>
        <Player 
          key           = { opponent.name }
          display_name  = { opponent.display_name }
          max_health    = { opponent.max_health }
          health        = { opponent_health }
          indicate_turn = { next_move === opponent.name }>
        </Player>
      </React.Fragment>
    );
  }


  renderPlayerMoves() {
    const {player_health} = this.state;
    const {player_moves, special_attack, player, special_attack_limit_perc, heal} = constants;

    return player_moves.map((move) => {
      let disabled = false;

      if (move.name === special_attack) {
        const player_health_perc = player_health * 100 / player.max_health;
        disabled = player_health_perc <= special_attack_limit_perc;
      }

      if (move.name === heal) {
        const player_health_perc = player_health * 100 / player.max_health;
        disabled = player_health_perc === 100;
      }

      return (<PlayerMove 
        key               = { move.name }
        ref               = { this.playerMoveRefs[move.name] }
        display_name      = { move.display_name }
        name              = { move.name }
        base_color        = { move.base_color }
        playerMoveHandler = { this.playerMoveHandler }
        disabled          = { disabled }>
      </PlayerMove>);
    });
  }


  render() {
    return (
      <div className="container border border-dark border-4 py-2 my-2">
        <div className="d-flex row justify-content-md-center col-md-10 offset-md-1">{
          this.renderPlayers()
        }</div>

        <div className="d-flex flex-row gap-3 justify-content-md-center col-md-10 offset-md-1 mt-5" ref={ this.moveRef }>{
          this.renderPlayerMoves()
        }</div>

        <div className="container"><LogBook logs={ this.state.log_book }></LogBook></div>

      </div>
    );
  }
}

export default Battleground;