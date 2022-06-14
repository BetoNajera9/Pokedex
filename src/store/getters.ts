import { GetterTree } from 'vuex'
import { State } from './state'
import { Pokemon } from '../services/poke-api/models'

export type Getters = {
	pokemon(state: State): Pokemon[]
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
