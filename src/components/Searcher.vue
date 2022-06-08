<template lang="pug">
section.searcher
  .search
    label Nombre o número
    .inputs
      span.text
        input#search-input(type='text')
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
	@apply bg-dark;
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
	@apply bg-green-dark;
	@apply text-light;
	@apply h-[88px];
	@apply p-4;
	@apply rounded-lg;
	@apply text-lg;
}
</style>
