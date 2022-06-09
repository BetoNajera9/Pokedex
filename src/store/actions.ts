import { ActionTree, ActionContext } from 'vuex'
import { Mutations, MutationTypes } from './mutations'

export enum ActionTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
}

type AugmentedActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>
} & Omit<ActionContext<any, any>, 'commit'>

export interface Actions {
	[ActionTypes.SetPokemonsData](
		{ commit }: AugmentedActionContext,
		data: any
	): void
}

export const actions: ActionTree<any, any> & Actions = {
	[ActionTypes.SetPokemonsData]({ commit }, data) {
		commit(MutationTypes.SetPokemonsData, data)
	},
}
