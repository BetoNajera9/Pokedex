import { MutationTree } from 'vuex'
import { pokemonData } from '../types/pokemon'
import { State } from './state'

export enum MutationTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetNextUrl = 'SET_NEXT_URL',
}

export type Mutations = {
	[MutationTypes.SetPokemonsData](state: State, data: pokemonData[]): void
	[MutationTypes.SetNextUrl](state: State, url: string): void
}

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.SetPokemonsData](state, data) {
		const verify = state.pokemons.find(
			(element: pokemonData) => element.id === data[0].id
		)
		if (!verify) {
			state.pokemons = [...state.pokemons, ...data]
		}
	},
	[MutationTypes.SetNextUrl](state, url) {
		state.nextUrl = url
	},
}
