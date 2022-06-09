import axios from 'axios'
import { pokemonsData } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const getPokemons = async (
	url: string = `${BASE_URL}/pokemon?limit=12&offset=0`
) => {
	const pokeData: pokemonsData = {}
	const pokemonIndex: string[] = []

	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: pokemonsList } = await axios(config)

	pokemonsList.results.forEach(async (element: any) => {
		pokemonIndex.push(element.name)
		const pokemonData = await getPokemon(element.url)
		pokeData[element.name] = pokemonData
	})

	return { pokeData, pokemonIndex }
}

export const getPokemon = async (url: string) => {
	const types: string[] = []
	const weakness: string[] = []
	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: pokemonsData } = await axios(config)

	pokemonsData.types.forEach(async (element: any) => {
		types.push(element.type.name)
		const dataType = await getTypes(element.type.url)

		dataType.forEach((element: any) => {
			if (weakness.indexOf(element.name) === -1) weakness.push(element.name)
		})
	})

	return {
		id: pokemonsData.id,
		type: { types, weakness },
		img: pokemonsData.sprites.other['official-artwork'].front_default,
		height: pokemonsData.height,
		weight: pokemonsData.weight,
	}
}

const getTypes = async (url: string) => {
	const config = {
		method: 'get',
		url,
		headers: {},
	}

	const { data: typesData } = await axios(config)

	return typesData.damage_relations.double_damage_from
}
