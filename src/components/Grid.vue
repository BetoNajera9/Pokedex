<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store'

export default defineComponent({
	props: ['setPokemonsData'],
	setup(props) {
		const { setPokemonsData } = props

		const store = useStore()

		const pokemonsData = computed(() => {
			return store.getters[setPokemonsData]
		})

		return {
			pokemonsData,
		}
	},
})
</script>

<template lang="pug">
.container
  .card(v-for="pokemon in pokemonsData" :key="pokemon.name")
    img.pokemon-img(:src="pokemon.img")
    p.pokemon-id N.°{{('000' + pokemon.id).substr(-3)}}
    strong
      .pokemon-name {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
    .types
      p(v-for="type in pokemon.type.types" :key="type" :class='type') {{type.charAt(0).toUpperCase() + type.slice(1)}}
</template>

<style lang="postcss" scoped>
.container {
	@apply mx-auto;
	@apply md:mx-0;
	@apply lg:mx-auto;
	@apply grid;
	@apply gap-0;
	@apply grid-cols-1;
	@apply sm:grid-cols-2;
	@apply md:grid-cols-3;
	@apply xl:grid-cols-4;
	@apply w-4/6;
	@apply mt-10;
}

.card {
	@apply w-[206px];
	@apply h-[286px];
	@apply mb-20;
}

.pokemon-img {
	@apply w-auto;
	@apply h-auto;
	@apply bg-light-dark;
	@apply rounded-md;
}

.pokemon-id {
	@apply text-sm;
	@apply text-dark-light;
	@apply my-2;
}

.pokemon-name {
	@apply text-xl;
	@apply my-3;
}

.types {
	@apply flex;
}

.types > * {
	@apply rounded-sm;
	@apply w-[73px];
	@apply h-[18px];
	@apply mx-0.5;
	@apply text-xs;
	@apply text-center;
}

.grass {
	@apply bg-green;
}

.poison {
	@apply bg-purple;
	@apply text-light;
}

.fire {
	@apply bg-orange;
	@apply text-light;
}

.water {
	@apply bg-blue;
	@apply text-light;
}

.bug {
	@apply bg-green-dark;
	@apply text-light;
}

.flying {
	@apply text-light;
	@apply bg-gradient-to-t;
	@apply from-blue;
	@apply to-dark-light;
}
</style>
