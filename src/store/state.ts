import { pokemonData } from '../types/pokemon'

export type State = {
	pokemons: pokemonData[]
	nextUrl: string
}

export const state: State = {
	pokemons: [],
	nextUrl: '',
}
