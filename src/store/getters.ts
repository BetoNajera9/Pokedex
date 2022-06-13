import { GetterTree } from 'vuex'
import { State } from './state'
import { pokemonData } from '../types/pokemon'

export type Getters = {
	pokemon(state: State): pokemonData[]
	nextUrl(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
	pokemon: (state) => {
		return state.pokemons
	},
	nextUrl: (state) => {
		return state.nextUrl
	},
}
