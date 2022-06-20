import axios, { AxiosInstance } from 'axios'
import { Pokemon } from './models'
import { PokemonStats } from './models/pokemon-stats.model'

export default class PokeApi {
	private client: AxiosInstance

	constructor() {
		this.client = axios.create({
			headers: {},
		})
	}

	async getPokemons(url: string) {
		const { data: pokemonsList } = await this.client.get(url)

		const pokeData: Pokemon[] = await Promise.all(
			pokemonsList.results.map((element: any) => {
				return this.getPokemon(element.url)
			})
		)
		return pokeData
	}

	private async getPokemon(url: string) {
		const types: string[] = []
		const weakness: string[] = []

		const { data: pokemonsData } = await this.client.get(url)

		const pokemonSpecies = await this.getSpecies(pokemonsData.species.url)

		await Promise.all(
			pokemonsData.types.map(async (element: any) => {
				const dataType = await this.getTypes(element.type.url)
				types.push(element.type.name)

				dataType.forEach((element: any) => {
					if (weakness.indexOf(element.name) === -1) weakness.push(element.name)
				})
			})
		)

		const stats: PokemonStats = {} as PokemonStats

		pokemonsData.stats.forEach((element: any) => {
			const a = []
			for (let index = 15; index >= 0; index--) {
				if (index < Math.round(element.base_stat / 15)) a.push('fill')
				else a.push('empty')
			}
			stats[element.stat.name] = {
				number: element.base_stat,
				array: a,
			}
		})

		return {
			id: pokemonsData.id,
			name: pokemonsData.name,
			type: { types, weakness },
			img: pokemonsData.sprites.other['official-artwork'].front_default,
			height: pokemonsData.height,
			weight: pokemonsData.weight,
			desciption: pokemonSpecies.description,
			evolution_chain: pokemonSpecies.evolution_chain,
			category: pokemonSpecies.category,
			ability: pokemonsData.abilities[0].ability.name,
			stats,
		}
	}

	private async getTypes(url: string) {
		const { data: typesData } = await this.client.get(url)

		return typesData.damage_relations.double_damage_from
	}

	private async getSpecies(url: string) {
		const { data: speciesData } = await this.client.get(url)

		const description = speciesData.flavor_text_entries[0].flavor_text

		const evolutionArray = speciesData.evolution_chain.url.split('/')

		const category = speciesData.genera.find(
			(element: any) => element.language.name === 'en'
		)

		return {
			description,
			evolution_chain: evolutionArray[evolutionArray.length - 2],
			category: category.genus,
		}
	}
}
