import { ActionTree, ActionContext } from 'vuex'
import { Mutations, MutationTypes } from './mutations'
import { State } from './state'
import { pokemonData } from '../types/pokemon'

export enum ActionTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetNextUrl = 'SET_NEXT_URL',
}

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
	[ActionTypes.SetPokemonsData](
		{ commit }: AugmentedActionContext,
		data: pokemonData[]
	): void
	[ActionTypes.SetNextUrl](
		{ commit }: AugmentedActionContext,
		url: string
	): void
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.SetPokemonsData]({ commit }, data) {
		commit(MutationTypes.SetPokemonsData, data)
	},
	[ActionTypes.SetNextUrl]({ commit }, url) {
		commit(MutationTypes.SetNextUrl, url)
	},
}
