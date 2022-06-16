<script lang="ts">
import { defineComponent, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import PokemonImage from '../components/PokemonImage.vue'
import { ActionTypes } from '../store/actions'
import { useStore } from '../store'

export default defineComponent({
	components: { PokemonImage },
	setup() {
		const route = useRoute()
		const store = useStore()

		let pokemon = computed(() =>
			store.getters.pokemon(route.params.name as string)
		)
		let pokemonEvolution = computed(() =>
			store.getters.pokemonEvolution(pokemon.value.evolution_chain)
		)
		let isFavorite = computed(() =>
			store.getters.favoritePokemon(pokemon.value.name)
		)

		const nextPokemon = computed(() => {
			if (pokemon.value.id === store.getters.pokemons.length) {
				return store.getters.pokemonById(1)
			}
			return store.getters.pokemonById(pokemon.value.id + 1)
		})
		const previousPokemon = computed(() => {
			if (pokemon.value.id === 1) {
				return store.getters.pokemonById(store.getters.pokemons.length)
			}
			return store.getters.pokemonById(pokemon.value.id - 1)
		})

		watch(
			() => route.params,
			(toParams, previousParams) => {
				pokemon = computed(() =>
					store.getters.pokemon(route.params.name as string)
				)
			}
		)

		const toogleFavorite = () => {
			if (isFavorite.value === false) {
				const pokemonData = store.getters.pokemon(pokemon.value.name)
				store.dispatch(ActionTypes.SetPokemonFavorite, pokemonData)
			} else {
				store.dispatch(ActionTypes.RemovePokemonFavorite, pokemon.value.name)
			}
			isFavorite = computed(() =>
				store.getters.favoritePokemon(pokemon.value.name)
			)
		}

		return {
			store,
			pokemon,
			pokemonEvolution,
			isFavorite,
			toogleFavorite,
			nextPokemon,
			previousPokemon,
		}
	},
})
</script>

<template lang="pug">
section.pokemon-neighbors
  router-link(:to="{ name: 'pokemonDetails', params: { name: previousPokemon.name }}")
    .neighbors-wrapper
      span.neighbors_attributes.arrow
          mdicon#btn-next-neighbors(name="chevron-left" size="25")
      span.neighbors_attributes
        p N.°{{('000' + previousPokemon.id).substr(-3)}}
      span.neighbors_attributes
        p {{previousPokemon.name.charAt(0).toUpperCase() + previousPokemon.name.slice(1)}}
  router-link(:to="{ name: 'pokemonDetails', params: { name: nextPokemon.name }}")
    .neighbors-wrapper
      span.neighbors_attributes
        p {{nextPokemon.name.charAt(0).toUpperCase() + nextPokemon.name.slice(1)}}
      span.neighbors_attributes
        p N.°{{('000' + nextPokemon.id).substr(-3)}}
      span.neighbors_attributes.arrow
        mdicon#btn-last-neighbors(name="chevron-right" size="25")
  .pokemon-pagination-title
    h1.pagination-title.title {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
    h1.pagination-title.number N.°{{('000' + pokemon.id).substr(-3)}}

section.pokemon-details
  .pokemon-rate
    span.toogle-favorite(@click="toogleFavorite")
      mdicon.btn-favorite(:class="{favorite: isFavorite}"  name="heart" size="30")
    router-link(:to="{ name: 'pokemonDetails', params: { name: pokemon.name }}")
      img(:src="pokemon.img")
    .pokemon-states
      h3 Puntos base
      div.graphic
        div.column.hp
          ul
            li(v-for="(item, index) in pokemon.stats.hp.array" :key="index" :class="item")
          h2 HP
        div.column.attack
          ul
            li(v-for="(item, index) in pokemon.stats.attack.array" :key="index" :class="item")
          h2 Attack
        div.column.defense
          ul
            li(v-for="(item, index) in pokemon.stats.defense.array" :key="index" :class="item")
          h2 Defense
        div.column.special-attack
          ul
            li(v-for="(item, index) in pokemon.stats['special-attack'].array" :key="index" :class="item")
          h2 Special attack
        div.column.special-defense
          ul
            li(v-for="(item, index) in pokemon.stats['special-defense'].array" :key="index" :class="item")
          h2 Special defense
        div.column.speed
          ul
            li(v-for="(item, index) in pokemon.stats.speed.array" :key="index" :class="item")
          h2 Speed
  .pokeomn-info
    .pokemon-description
      p {{pokemon.description}}
    .pokemon-attributes
      div
        .attribute-section
          h1.title Height
          h3.attribute-info {{pokemon.height}} m
        .attribute-section
          h1.title Weight
          h3.attribute-info {{pokemon.weight}} Kg
        .attribute-section
          h1.title Gender
          .gender
            mdicon#btn-male(name="gender-male" size="35")
            mdicon#btn-famele(name="gender-female" size="35")
      div
        .attribute-section
          h1.title Category
          h3.attribute-info {{pokemon.category}}
        .attribute-section
          h1.title Ability
          h3.attribute-info {{pokemon.ability.charAt(0).toUpperCase() + pokemon.ability.slice(1)}}
    .pokemon-ability
      div.type
        h1.ability-title Type
        .tag
          div(v-for="(type, index) in pokemon.type.types" :key="index" :class="type")
            p {{type}}
      div.weakness
        h1.ability-title Weakness
        .tag
          div(v-for="(weakness, index) in pokemon.type.weakness" :key="index" :class="weakness")
            p {{weakness}}
section.pokemon-evolutions
  h1 Evolutions
  .evolutions
    .card-information(v-for="pokemon in pokemonEvolution" :key="pokemon.name" :class="pokemon.evolution_chain")
      pokemon-image.evolutions-image(:imgSrc="pokemon.img" :favorite="false" :pokemonName="pokemon.name")
      .pokemon-information
        strong
          .pokemon-name-evolution {{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}}
        p.pokemon-id-evolution N.°{{('000' + pokemon.id).substr(-3)}}
      .types.evolution
        p(v-for="type in pokemon.type.types" :key="type" :class='type') {{type.charAt(0).toUpperCase() + type.slice(1)}}
</template>

<style lang="postcss" scoped>
.pokemon-neighbors {
	@apply grid;
	@apply grid-cols-2;
	@apply gap-1;
	@apply pt-20;
}
.neighbors-wrapper {
	@apply h-[119px];
	@apply bg-dark;
	@apply flex;
	@apply justify-center;
	@apply items-center;
	@apply text-2xl;
	@apply pb-10;
}

.neighbors_attributes {
	@apply mx-4;
	@apply inline-block;
	@apply justify-center;
}

.arrow {
	@apply rounded-full;
	@apply bg-light;
}

.pokemon-pagination-title {
	@apply bg-light;
	@apply relative;
	@apply left-[25vw];
	@apply -top-[55px];
	@apply w-[50vw];
	@apply flex;
	@apply justify-center;
	@apply items-center;
	@apply text-4xl;
	@apply h-[52px];
	/* @apply before:bg-notch;
	@apply before:content-['_'];
	@apply before:w-[75px];
	@apply before:relative;
	@apply before:-left-[12vw];
	@apply after:bg-notch;
	@apply after:content-['_'];
	@apply after:w-[75px];
	@apply after:bg-right-top;
	@apply after:relative;
	@apply after:left-[12vw]; */
}

.pagination-title.number {
	@apply text-dark-high;
	@apply mx-4;
}

.pokemon-details {
	@apply grid;
	@apply grid-cols-2;
	@apply mt-20;
	@apply mx-[10vw];
	@apply lg:mx-[20vw];
}

.pokemon-details > * {
	@apply mx-4;
}

.pokemon-rate {
	@apply flex;
	@apply flex-col;
	@apply items-end;
}

.pokemon-rate > * {
	@apply my-5;
}

.pokemon-img {
	@apply w-[90%];
}

.pokemon-states {
	@apply w-[95%];
	@apply bg-dark;
	@apply rounded-xl;
	@apply flex;
	@apply flex-col;
}

.pokemon-states h3 {
	@apply m-3;
}

.graphic {
	@apply flex;
	@apply px-4;
	@apply py-2;
}

.column {
	@apply w-[17%];
	@apply mx-1;
}

.column h2 {
	@apply text-sm;
}

.column ul li {
	@apply h-[8px];
	@apply mt-1;
}

li.empty {
	@apply bg-light;
}
li.fill {
	@apply bg-blue;
}

.pokemon-description {
	@apply my-5;
	@apply text-lg;
}

.pokemon-attributes {
	@apply grid;
	@apply grid-cols-2;
	@apply bg-blue;
	@apply rounded-lg;
	@apply p-5;
}

.attribute-section {
	@apply mb-5;
}

.attribute-section > h1 {
	@apply my-2;
	@apply text-light;
}
.attribute-section > h3 {
	@apply text-xl;
}

.gender {
	@apply flex;
}

.gender .mdi {
	@apply mx-2;
}

.pokemon-ability > div {
	@apply mt-5;
}

.tag {
	@apply flex;
	@apply flex-wrap;
	@apply justify-start;
}

.tag div {
	@apply w-32;
	@apply h-7;
	@apply flex;
	@apply justify-center;
	@apply items-center;
	@apply rounded-lg;
	@apply m-2;
}

.pokemon-evolutions {
	@apply h-[365px];
	@apply opacity-80;
	@apply bg-dark-high;
	@apply mx-[10vw];
	@apply lg:mx-[20vw];
	@apply rounded-lg;
}

.pokemon-information {
	@apply flex;
	@apply justify-center;
}

.pokemon-information > * {
	@apply mx-2;
}

.evolutions {
	@apply flex;
	@apply justify-evenly;
}

.evolutions-image {
	@apply rounded-full;
	@apply border-[5px];
	@apply border-light;
	@apply bg-dark-high;
}

.pokemon-name-evolution {
	@apply text-light;
}
.pokemon-id-evolution {
	@apply text-dark;
}

.types.evolution {
	@apply flex;
	@apply justify-center;
}

.card-information {
	@apply w-[20%];
}

.card-information > * {
	@apply my-5;
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
