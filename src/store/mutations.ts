import { MutationTree } from 'vuex'

export enum MutationTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
}

export type Mutations = {
	[MutationTypes.SetPokemonsData](state: any, data: any): void
}

export const mutations: MutationTree<any> & Mutations = {
	[MutationTypes.SetPokemonsData](state, data) {
		if (!state.pokemons[data.pokemonIndex[0]]) {
			state.pokemonIndex = state.pokemonIndex.concat(data.pokemonIndex)
			state.pokemons = data.pokeData
		}
	},
}
