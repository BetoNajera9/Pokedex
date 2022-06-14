<template lang="pug">
nav
  span.menu(@click="setActive")
    mdicon#btn-menu(name="menu" :class="{active: isActive}" size="35")
  ul
    li.pokeball
      router-link(to="/")
        mdicon#btn-pokeball(name="pokeball" size="35")
        p Pokedex
    li.favorites
      router-link(to="/favorites")
        mdicon#btn-favorites(name="star" size="35")
        p Favoritos
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const isActive = ref(false)

		const toogleActive = () => {
			isActive.value = !isActive.value
		}

		return { isActive, setActive: toogleActive }
	},
})
</script>

<style lang="postcss" scoped>
.menu.active {
	@apply cursor-pointer;
}

.menu {
	@apply h-[55px];
	@apply text-dark;
	@appl bg-red;
	@apply md:hidden;
}

nav {
	@apply bg-light;
	@apply shadow;
	@apply md:flex;
	@apply md:justify-center;
}
ul {
	@apply md:w-3/6;
	@apply md:flex;
	@apply md:justify-center;
}
li {
	@apply after:content-none;
	@apply before:content-['_'];
	@apply before:absolute;
	@apply before:left-0;
	@apply before:h-[55px];
	@apply before:w-2;
	@apply ml-2;

	@apply md:before:content-none;
	@apply md:after:content-['_'];
	@apply md:after:h-[6px];
	@apply md:after:absolute;
	@apply md:after:top-[87px];
	@apply md:after:w-[128px];
	@apply md:ml-0;
}
li.pokeball {
	@apply before:bg-red;
	@apply after:bg-red;
	@apply md:hover:bg-red;
}
li.favorites {
	@apply before:bg-yellow;
	@apply after:bg-yellow;
	@apply md:hover:bg-yellow;
}

a {
	@apply text-base;
	@apply text-dark;
	@apply flex;
	@apply items-center;
	@apply w-[895px];
	@apply h-[55px];
	@apply md:w-[128px];
	@apply md:h-[87px];
	@apply md:flex-col;
	@apply md:justify-evenly;
	@apply md:items-center;
	@apply hover:text-light;
}

a > span {
	@apply m-[23px];
	@apply md:m-0;
}
</style>
