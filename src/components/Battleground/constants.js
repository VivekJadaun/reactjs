const constants = {
  players: [
    {
      name: 'player',
      display_name: 'Player',
      health: 100,
      mode: 'manual',
    },
    {
      name: 'monster',
      display_name: 'Monster',
      health: 150,
      mode: 'auto',
    },
  ],

  moves: [
    {
      name: 'attack',
      display_name: 'Attack',
      min_damage: 1, 
      max_damage: 10, 
    },
    {
      name: 'special_attack',
      display_name: 'Special attack',
      min_damage: 10, 
      max_damage: 20, 
    },
    {
      name: 'heal',
      display_name: 'Heal',
      min_damage: -10, 
      max_damage: -10, 
    },
  ]
}

export default constants;