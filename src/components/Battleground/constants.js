const constants = {
  player: {
    name: 'player',
    display_name: 'Player',
    max_health: 100,
  },

  opponent: {
    name: 'monster',
    display_name: 'Monster',
    max_health: 120,
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
      max_damage: 20, 
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