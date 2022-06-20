<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

export default defineComponent({
	setup() {
		const store = useStore()
		let input = ref('')

		const search = () => {
			store.dispatch(ActionTypes.SetPokemonFiltered, input.value)
			input.value = ''
		}

		onBeforeMount(() => {
			store.dispatch(ActionTypes.SetPokemonFiltered, '')
		})

		return {
			input,
			search,
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
      span.search-btn(@click="search")
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
	@apply px-2;
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
