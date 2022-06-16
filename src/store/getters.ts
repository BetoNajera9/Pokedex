import { GetterTree } from 'vuex'
import { State } from './state'
import { Pokemon } from '../services/poke-api/models'

export type Getters = {
	pokemons(state: State): Pokemon[]
	pokemon(state: State): (name: string) => Pokemon
	pokemonById(state: State): (id: number) => Pokemon
	pokemonEvolution(state: State): (evolution_chain: string) => Pokemon[]
	nextUrl(state: State): string
	favoritePokemon(state: State): (name: string) => boolean
}

export const getters: GetterTree<State, State> & Getters = {
	pokemons: (state) => {
		return state.pokemons
	},
	pokemon: (state) => {
		return (name: string) => {
			const pokemon = state.pokemons.find(
				(element: Pokemon) => element.name === name
			)
			return pokemon!
		}
	},
	pokemonById: (state) => {
		return (id: number) => {
			const pokemon = state.pokemons.find(
				(element: Pokemon) => element.id === id
			)
			return pokemon!
		}
	},
	pokemonEvolution: (state) => {
		return (evolution_chain: string) => {
			const pokemon = state.pokemons.filter(
				(element: Pokemon) => element.evolution_chain === evolution_chain
			)
			return pokemon!
		}
	},
	nextUrl: (state) => {
		return state.nextUrl
	},
	favoritePokemons: (state) => {
		return state.favoritePokemons
	},
	favoritePokemon: (state) => {
		return (name: string) => {
			const pokemon = state.favoritePokemons.find(
				(element: Pokemon) => element.name === name
			)

			return !pokemon ? false : true
		}
	},
}
