import { GetterTree } from 'vuex'
import { State } from './state'
import { Pokemon } from '../services/poke-api/models'

export type Getters = {
	pokemons(state: State): Pokemon[]
	pokemon(state: State): (name: string) => Pokemon
	pokemonContent(state: State): Pokemon[]
	pokemonIndex(state: State): number
	pokemonCount(state: State): number
	pokemonById(state: State): (id: number) => Pokemon
	pokemonFiltered(state: State): Pokemon[]
	pokemonEvolution(state: State): (evolution_chain: string) => Pokemon[]
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
	pokemonContent: (state) => {
		if (state.pokemonFiltered === '') {
			return state.pokemons.filter(
				(pokemon: Pokemon, index: number) => index < state.pokemonIndex
			)
		}
		return state.pokemons.filter((pokemon: Pokemon, index: number) => {
			const pokemonString = pokemon.name.includes(state.pokemonFiltered)
			const pokemonNumber = pokemon.id
				.toString()
				.includes(state.pokemonFiltered)

			return pokemonString || pokemonNumber
		})
	},
	pokemonIndex: (state) => {
		return state.pokemonIndex
	},
	pokemonCount: (state) => {
		return state.pokemonCount
	},
	pokemonById: (state) => {
		return (id: number) => {
			const pokemon = state.pokemons.find(
				(element: Pokemon) => element.id === id
			)
			return pokemon!
		}
	},
	pokemonFiltered: (state) => {
		const pokemons = state.pokemons.filter((pokemon: Pokemon) => {
			const pokemonString = pokemon.name.includes(state.pokemonFiltered)
			const pokemonNumber = pokemon.id
				.toString()
				.includes(state.pokemonFiltered)

			return pokemonString || pokemonNumber
		})
		return pokemons
	},
	pokemonEvolution: (state) => {
		return (evolution_chain: string) => {
			const pokemon = state.pokemons.filter(
				(element: Pokemon) => element.evolution_chain === evolution_chain
			)
			return pokemon!
		}
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
