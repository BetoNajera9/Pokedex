import { MutationTree } from 'vuex'
import { Pokemon } from '../services/poke-api/models'
import { State } from './state'

export enum MutationTypes {
	SetPokemonsData = 'SET_POKEMONS_DATA',
	SetPokemonCount = 'SET_POKEMON_COUNT',
	SetPokemonIndex = 'SET_POKEMON_INDEX',
	SetPokemonFiltered = 'SET_POKEMON_FILTERED',
	SetPokemonFavorite = 'SET_POKEMON_FAVORITE',
	RemovePokemonFavorite = 'REMOVE_POKEMON_FAVORITE',
}

export type Mutations = {
	[MutationTypes.SetPokemonsData](state: State, data: Pokemon[]): void
	[MutationTypes.SetPokemonCount](state: State, pokemonCount: number): void
	[MutationTypes.SetPokemonIndex](state: State, pokemonIndex: number): void
	[MutationTypes.SetPokemonFiltered](state: State, input: string): void
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
			localStorage.setItem('pokemons', JSON.stringify(state.pokemons))
		}
	},
	[MutationTypes.SetPokemonCount](state, pokemonCount) {
		state.pokemonCount = pokemonCount
	},
	[MutationTypes.SetPokemonIndex](state, pokemonIndex) {
		state.pokemonIndex = pokemonIndex
	},
	[MutationTypes.SetPokemonFiltered](state, input) {
		state.pokemonFiltered = input
	},
	[MutationTypes.SetPokemonFavorite](state, data) {
		state.favoritePokemons.push(data)
		localStorage.setItem(
			'favoritePokemon',
			JSON.stringify(state.favoritePokemons)
		)
	},
	[MutationTypes.RemovePokemonFavorite](state, name) {
		state.favoritePokemons = state.favoritePokemons.filter(
			(element: Pokemon) => element.name !== name
		)

		localStorage.setItem(
			'favoritePokemon',
			JSON.stringify(state.favoritePokemons)
		)
	},
}
