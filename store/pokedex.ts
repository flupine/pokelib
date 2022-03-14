import { defineStore } from 'pinia'

export const usePokedex = defineStore('pokedex', {
  state: () => ({
    pokemons: []
  }),
  getters: {
    list(): any  {
      return this.pokemons
    },
  },

  actions: {
    capture(name: string, sprite: string): void {
      // @ts-ignore
      this.pokemons.push({ name, sprite });
    },
    backup(file: []): void {
      this.pokemons = file;
    },
    remove(index: number): void {
      this.pokemons.splice(index, 1);
    }
  },
})
