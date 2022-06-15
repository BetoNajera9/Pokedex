import { ActionTree, ActionContext } from 'vuex'
import { Mutations, MutationTypes } from './mutations'
import { State } from './state'
import { Pokemon } from '../services/poke-api/models'

export enum ActionTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetNextUrl = 'SET_NEXT_URL',
	SetPokemonFavorite = 'SET_POKEMON_FAVORITE',
	RemovePokemonFavorite = 'REMOVE_POKEMON_FAVORITE',
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
		data: Pokemon[]
	): void
	[ActionTypes.SetNextUrl](
		{ commit }: AugmentedActionContext,
		url: string
	): void
	[ActionTypes.SetPokemonFavorite](
		{ commit }: AugmentedActionContext,
		data: Pokemon
	): void
	[ActionTypes.RemovePokemonFavorite](
		{ commit }: AugmentedActionContext,
		data: Pokemon
	): void
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.SetPokemonsData]({ commit }, data) {
		commit(MutationTypes.SetPokemonsData, data)
	},
	[ActionTypes.SetNextUrl]({ commit }, url) {
		commit(MutationTypes.SetNextUrl, url)
	},
	[ActionTypes.SetPokemonFavorite]({ commit }, data) {
		commit(MutationTypes.SetPokemonFavorite, data)
	},
	[ActionTypes.RemovePokemonFavorite]({ commit }, data) {
		commit(MutationTypes.RemovePokemonFavorite, data)
	},
}
