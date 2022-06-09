import { pokemonsData } from '../types/pokemon'

export type State = {
	pokemonIndex: string[]
	pokemons: pokemonsData
	favoritePokemons: pokemonsData
}

export const state: State = {
	pokemonIndex: [],
	pokemons: {},
	favoritePokemons: {},
}
