export const initialStatePokemon = { pokemonCaughts: [] }

export function pokemonReducer(state, action) {
  switch(action.type) {
    case POKEMON_ACTIONS.CATCH_POKEMON:
      return { pokemonCaughts: [...state.pokemonCaughts, action.value ] }
    case POKEMON_ACTIONS.RELEASE_POKEMON:
      return { pokemonCaughts: state.pokemonCaughts.filter(poke => poke !== action.value) }
    default:
      throw new Error('unknown actionn type')
  }
}

export const POKEMON_ACTIONS = {
  CATCH_POKEMON: 'CATCH_POKEMON',
  RELEASE_POKEMON: 'RELEASE_POKEMON',
}