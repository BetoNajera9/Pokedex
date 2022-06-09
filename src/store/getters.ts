import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
	pokemon(state: State): any
	pokemonIndex(state: State): string[]
}

export const getters: GetterTree<State, State> & Getters = {
	pokemon: (state) => {
		return state.pokemons
	},
	pokemonIndex: (state) => {
		return state.pokemonIndex
	},
}
