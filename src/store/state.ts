import { Pokemon } from '../services/poke-api/models/'

export type State = {
	pokemons: Pokemon[]
	nextUrl: string
	favoritePokemons: Pokemon[]
}

export const state: State = {
	pokemons: [],
	nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0',
	favoritePokemons: [],
}
