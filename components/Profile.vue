<template>
  <div>
    <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div class="xl:w-2/6 lg:w-2/5 w-80 md:block" v-if="monster.sprites">
        <img class="w-full" alt="home" :data-src="monster.sprites.other.home.front_default" v-lazy-load/>
      </div>
      <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div class="border-b border-gray-200 pb-6">
          <p class="text-sm leading-none text-gray-600 dark:text-gray-300 ">Pokemon details</p>
          <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">{{ monster.name }}</h1>
        </div>
        <button @click="addToPokedex(monster.name, monster.sprites.front_default)" class=" focus:outline-none text-base flex items-center justify-center leading-none text-white bg-indigo-600 w-full py-4 hover:bg-indigo-700 focus:outline-none">
          Ajouter à mon équipe
        </button>
        <div>
          <p class="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">Voici les caractéristiques de ce pokemon :</p>
          <p class="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300" v-for="(stat, index) in monster.stats" :key="index">
            {{ stat.stat.name.toUpperCase() }}: {{ stat.base_stat }}
          </p>
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
