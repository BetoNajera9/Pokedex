import { Pokemon } from '../services/poke-api/models/'

export type State = {
	pokemons: Pokemon[]
	pokemonIndex: number
	pokemonFiltered: string
	pokemonCount: number
	favoritePokemons: Pokemon[]
}

export const state: State = {
	pokemons: [],
	pokemonIndex: 12,
	pokemonFiltered: '',
	pokemonCount: 898,
	favoritePokemons: [],
}
