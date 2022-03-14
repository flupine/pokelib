<template>
  <div>
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" v-show="pokemons.length > 0">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 text-center mb-4">Liste de nos pokémons</h2>
      <!-- Search bar -->
      <div class="flex justify-center">
        <div class="mb-3 xl:w-96">
          <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
            <input type="search" v-model="searchTerm" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search">
          </div>
        </div>
      </div>

      <!-- Infinite list of Pokemons -->
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-4" v-if="search.length === 0">Aucun pokémon trouvé avec ce nom</h2>
        <div class="group relative" v-for="(monster, index) in search" :key="index">
          <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img :data-src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + monster.url.split('/')[6] + '.png'" :alt="'Sprite of' + monster.name" class="w-full h-full object-center object-cover lg:w-full lg:h-full" v-lazy-load>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <NuxtLink :to="'/monster/' + monster.name">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ monster.name }}
                </NuxtLink>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- loading -->
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" v-show="pokemons.length === 0">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Chargement en cours...</h2>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

interface Pokemon {
  name: string
  url: string
}

export default Vue.extend({
  name: 'List',
  data () {
    return {
      offset: 100,
      searchTerm: '',
      pokemons: []
    }
  },
  computed: {
    search(): Pokemon[] {
      return this.pokemons.filter((monster: Pokemon) => {
        return monster.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
  methods: {
    getInitialPokemons(): void {
      this.$axios.$get(`pokemon?limit=100`).then(response => {
        this.pokemons = response.results;
      });
    },
    getNextBatch(): void {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight;
        if (bottomOfWindow && this.search.length > 0) {
          this.$axios.$get(`pokemon?limit=100&offset=` + this.offset).then(response => {
            this.pokemons.push.apply(this.pokemons, response.results);
            this.offset += this.offset;
          });
        }
      }
    },
  },
  mounted(): void {
    this.getNextBatch();
  },
  beforeMount(): void {
    this.getInitialPokemons();
  },
})
</script>
