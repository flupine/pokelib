<template>
  <div>
    <div class="bg-white">
      <div class="pt-6">
        <div class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8" v-if="monster.sprites" >
          <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img :data-src="monster.sprites.other.home.front_default" alt="home" class="w-full h-full object-center object-cover" v-lazy-load>
          </div>
          <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img :data-src="monster.sprites.other.dream_world.front_default || monster.sprites.back_default" alt="dream world" class="w-full h-full object-center object-cover" v-lazy-load>
            </div>
            <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img :data-src="monster.sprites.front_default" alt="front_default" class="w-full h-full object-center object-cover" v-lazy-load>
            </div>
          </div>
          <div class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img :data-src="monster.sprites.other.home.front_shiny" alt="shiny" class="w-full h-full object-center object-cover" v-lazy-load>
          </div>
        </div>

        <!-- Product info -->
        <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{{ monster.name }}</h1>
          </div>

          <div class="mt-4 lg:mt-0 lg:row-span-3">
              <button @click="addToPokedex(monster.name, monster.sprites.front_default)" class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ajouter à mon équipe
              </button>
          </div>

          <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Statistics</h3>

              <div class="mt-4">
                <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                  <li class="text-gray-400" v-for="(stat, index) in monster.stats" :key="index">
                    <span class="text-gray-600">{{ stat.base_stat }} - {{ stat.stat.name.toUpperCase() }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- loading -->
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" v-show="isLoading">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Chargement en cours...</h2>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { usePokedex } from '~/store/pokedex'
import Swal from 'sweetalert2'

export default Vue.extend({
  name: 'Profile',
  props: {
    monsterName: String
  },
  data () {
    return {
      isLoading: false,
      monster: {},
      pokedex: usePokedex()
    }
  },
  methods: {
    async addToPokedex(name: string, sprite: string): Promise<void> {
      this.pokedex.capture(name, sprite);
      Swal.fire(
          'Attrapé !',
          'Le pokemon est dans votre équipe désormais !',
          'success'
      )
    },
    async getMonster(): Promise<void> {
      try {
        const response = await this.$axios.$get(`pokemon/` + this.monsterName);
        this.monster = response;
      } catch (e) {
        console.log(e);
        await this.$nuxt.$options.router!.push('/');
      }
    },
  },
  beforeMount(): void {
    this.isLoading = true;
    this.getMonster();
    this.isLoading = false;
  },
})
</script>
