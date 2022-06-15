import { MutationTree } from 'vuex'
import { Pokemon } from '../services/poke-api/models'
import { State } from './state'

export enum MutationTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetNextUrl = 'SET_NEXT_URL',
	SetPokemonFavorite = 'SET_POKEMON_FAVORITE',
	RemovePokemonFavorite = 'REMOVE_POKEMON_FAVORITE',
}

export type Mutations = {
	[MutationTypes.SetPokemonsData](state: State, data: Pokemon[]): void
	[MutationTypes.SetNextUrl](state: State, url: string): void
	[MutationTypes.SetPokemonFavorite](state: State, data: Pokemon): void
	[MutationTypes.RemovePokemonFavorite](state: State, name: string): void
}

export const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.SetPokemonsData](state, data) {
		const verify = state.pokemons.find(
			(element: Pokemon) => element.id === data[0].id
		)
		if (!verify) {
			state.pokemons = [...state.pokemons, ...data]
		}
	},
	[MutationTypes.SetNextUrl](state, url) {
		state.nextUrl = url
	},
	[MutationTypes.SetPokemonFavorite](state, data) {
		state.favoritePokemons.push(data)
	},
	[MutationTypes.RemovePokemonFavorite](state, name) {
		state.favoritePokemons = state.favoritePokemons.filter(
			(element: Pokemon) => element.name !== name
		)
	},
}
