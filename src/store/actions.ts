import { ActionTree, ActionContext } from 'vuex'
import { Mutations, MutationTypes } from './mutations'
import { State } from './state'
import { Pokemon } from '../services/poke-api/models'

export enum ActionTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetPokemonCount = 'SET_POKEMON_COUNT',
	SetPokemonIndex = 'SET_POKEMON_INDEX',
	SetPokemonFiltered = 'SET_POKEMON_FILTERED',
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
	[ActionTypes.SetPokemonCount](
		{ commit }: AugmentedActionContext,
		pokemonCount: number
	): void
	[ActionTypes.SetPokemonIndex](
		{ commit }: AugmentedActionContext,
		pokemonIndex: number
	): void
	[ActionTypes.SetPokemonFiltered](
		{ commit }: AugmentedActionContext,
		input: string
	): void
	[ActionTypes.SetPokemonFavorite](
		{ commit }: AugmentedActionContext,
		data: Pokemon
	): void
	[ActionTypes.RemovePokemonFavorite](
		{ commit }: AugmentedActionContext,
		name: string
	): void
}

export const actions: ActionTree<State, State> & Actions = {
	[ActionTypes.SetPokemonsData]({ commit }, data) {
		commit(MutationTypes.SetPokemonsData, data)
	},
	[ActionTypes.SetPokemonCount]({ commit }, pokemonCount) {
		commit(MutationTypes.SetPokemonCount, pokemonCount)
	},
	[ActionTypes.SetPokemonIndex]({ commit }, pokemonIndex) {
		commit(MutationTypes.SetPokemonIndex, pokemonIndex)
	},
	[ActionTypes.SetPokemonFiltered]({ commit }, input) {
		commit(MutationTypes.SetPokemonFiltered, input)
	},
	[ActionTypes.SetPokemonFavorite]({ commit }, data) {
		commit(MutationTypes.SetPokemonFavorite, data)
	},
	[ActionTypes.RemovePokemonFavorite]({ commit }, name) {
		commit(MutationTypes.RemovePokemonFavorite, name)
	},
}
