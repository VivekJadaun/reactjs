const constants = {
  special_attack: 'special_attack',

  heal: 'heal',

  special_attack_limit_perc: 30,

  opponent_move_delay_in_ms: 1000,

  forfeit: 'forfeit',

  forfeit_msg: 'surrendered! Game Over!',

  game_over_msg: 'won! Game Over!',
  
  victory_msg: 'won! Game Over!',

  defeat_msg: 'defeated! Game Over!',

  first_move: 'player_1',  

  first_player_key: 'player_1', 

  second_player_key: 'player_2', 

  players: {
    player_1: {
      name: 'player_1',
      display_name: 'Player 1',
      max_health: 50,
      health: 50,

      moves: [
        {
          name: 'attack',
          display_name: 'Attack',
          min_damage: 1, 
          max_damage: 10,
          base_color: 'salmon', 
          self_effect: false,
          disabled: false,
        },
        {
          name: 'forfeit',
          display_name: 'Forfeit',
          base_color: 'magenta',
          disabled: false,
        },
      ]
    },


    player_2: {
      name: 'player_2',
      display_name: 'Player 2',
      max_health: 50,
      health: 50,
      
      moves: [
        {
          name: 'attack',
          display_name: 'Attack',
          min_damage: 1, 
          max_damage: 20,
          base_color: 'salmon', 
          self_effect: false,
          disabled: false,
        },
        // {
        //   name: 'forfeit',
        //   display_name: 'Forfeit',
        //   base_color: 'magenta',
        //   disabled: false,
        // },
      ]
    },
  },


  lucky_moves: [
    {
      name: 'special_attack',
      display_name: 'Special attack',
      min_damage: 10, 
      max_damage: 50, 
      base_color: 'orange', 
      self_effect: false,
      disabled: false,
    },
    {
      name: 'heal',
      display_name: 'Heal',
      min_damage: -10, 
      max_damage: -10, 
      base_color: 'cyan', 
      self_effect: true,
      disabled: false,
    },
  ]
}

export default constants;