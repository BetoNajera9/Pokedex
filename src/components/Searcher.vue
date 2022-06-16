<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Pokemon } from '../services/poke-api/models'
import { useStore } from '../store'

export default defineComponent({
	setup() {
		const store = useStore()
		const pokemons = computed(() => store.getters.pokemons)
		let input = ref('')

		const searchedList = () => {
			return pokemons.value.filter((pokemon: Pokemon) => {
				if (input.value === '') return false

				const pokemonString = pokemon.name.includes(input.value)
				const pokemonNumber = pokemon.id.toString().includes(input.value)

				return pokemonString || pokemonNumber
			})
		}

		return {
			searchedList,
			input,
		}
	},
})
</script>

<template lang="pug">
section.searcher
  .search
    label Nombre o número
    .inputs
      span.text
        input#search-input(type="text" v-model="input" placeholder="Search pokemons...")
      .list-wrapp
        .list-pokemons(v-for="pokemon in searchedList()" :key="pokemon")
          p N.°{{('000' + pokemon.id).substr(-3)}} - {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
      span.search-btn
        mdicon#search-btn(name="magnify" size="35")
    p.subtitles ¡Usa la búsqueda avanzada para encontrar Pokémon por su tipo, debilidad, habilidad y demás datos!
  .info
    .info-wrapp
      h2 Busca un Pokémon por su nombre o usando su número de la Pokédex Nacional.
</template>

<style lang="postcss" scoped>
.searcher {
	@apply flex;
	@apply justify-evenly;
	@apply bg-dark-high;
	@apply text-light;
}

.search {
	@apply flex;
	@apply flex-col;
	@apply my-10;
	@apply w-[430px];
}

.search > label {
	@apply text-2xl;
}

.inputs {
	@apply flex;
	@apply justify-evenly;
}

.text {
	@apply w-full;
	@apply p-1;
	@apply flex;
	@apply items-center;
	@apply text-dark-high;
}

.text > input {
	@apply h-5/6;
	@apply w-5/6;
}

.search-btn {
	@apply text-light;
	@apply bg-orange;
	@apply rounded-lg;
	@apply px-3;
	@apply py-2;
	@apply cursor-pointer;
	@apply active:bg-red;
}

.info {
	@apply w-[430px];
	@apply flex;
	@apply items-center;
}

.info-wrapp {
	@apply bg-green-high;
	@apply text-light;
	@apply h-[88px];
	@apply p-4;
	@apply rounded-lg;
	@apply text-lg;
}

.list-wrapp {
	@apply absolute;
	@apply top-[278px];
	@apply left-[197px];
	@apply border;
}

.list-pokemons {
	@apply z-50;
	@apply bg-light;
	@apply text-dark-high;
	@apply hover:bg-blue;
	@apply cursor-pointer;
	@apply w-[255px];
}
</style>
