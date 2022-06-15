<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../store'
import PokemonImage from './PokemonImage.vue'

export default defineComponent({
	components: { PokemonImage },
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
		pokemon-image.pokemon-img(:imgSrc="pokemon.img" :favorite="true" :pokemonName="pokemon.name")
		router-link(:to="{ name: 'pokemonDetails', params: { name: pokemon.name }}")
			p.pokemon-id N.°{{('000' + pokemon.id).substr(-3)}}
			strong
				.pokemon-name {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
		.types
			p(v-for="type in pokemon.type.types" :key="type" :class='type') {{type.charAt(0).toUpperCase() + type.slice(1)}}
</template>

<style lang="postcss">
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
	@apply bg-light-high;
	@apply rounded-md;
}

.pokemon-id {
	@apply text-sm;
	@apply text-dark;
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

.bug {
	@apply bg-green-high;
	@apply text-light;
}

.dragon {
	@apply text-light;
	@apply bg-gradient-to-t;
	@apply from-blue;
	@apply to-red;
}

.fairy {
	@apply bg-pink-low;
}

.fire {
	@apply bg-orange;
	@apply text-light;
}

.ghost {
	@apply bg-purple-high;
	@apply text-light;
}

.ground {
	@apply bg-gradient-to-t;
	@apply from-yellow;
	@apply to-yellow-high;
	@apply text-light;
}

.normal {
	@apply bg-dark-low;
	@apply text-light;
}

.psychic {
	@apply bg-pink;
	@apply text-light;
}

.steel {
	@apply bg-dark;
}

.dark {
	@apply bg-dark-high;
	@apply text-light;
}

.electric {
	@apply bg-yellow;
}

.fighting {
	@apply bg-orange-high;
	@apply text-light;
}

.flying {
	@apply text-light;
	@apply bg-gradient-to-t;
	@apply from-blue;
	@apply to-dark;
}

.grass {
	@apply bg-green;
}

.ice {
	@apply bg-blue-low;
}

.poison {
	@apply bg-purple;
	@apply text-light;
}

.rock {
	@apply bg-yellow-high;
}

.water {
	@apply bg-blue;
	@apply text-light;
}
</style>
