const constants = {
  special_attack: 'special_attack',

  heal: 'heal',

  special_attack_limit_perc: 30,

  opponent_move_delay_in_ms: 1000,

  forfeit: 'forfeit',

  forfeit_msg: 'You have surrendered! You lost',

  victory_msg: 'Congrats! You\'ve won',

  defeat_msg: 'You have been defeated! Please Try Again',

  first_move: 'player',  

  player: {
    name: 'player',
    display_name: 'Player',
    max_health: 50,
  },

  opponent: {
    name: 'monster',
    display_name: 'Monster',
    max_health: 50,
    min_attack: 1, 
    max_attack: 20, 
  },

  player_moves: [
    {
      name: 'attack',
      display_name: 'Attack',
      min_damage: 1, 
      max_damage: 10,
      base_color: 'salmon', 
      self_effect: false,
    },
    {
      name: 'special_attack',
      display_name: 'Special attack',
      min_damage: 10, 
      max_damage: 50, 
      base_color: 'orange', 
      self_effect: false,
    },
    {
      name: 'heal',
      display_name: 'Heal',
      min_damage: -10, 
      max_damage: -10, 
      base_color: 'cyan', 
      self_effect: true,
    },
    {
      name: 'forfeit',
      display_name: 'Give Up',
      base_color: 'magenta', 
    },
  ]
}

export default constants;