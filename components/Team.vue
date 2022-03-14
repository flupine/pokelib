<template>
  <div >
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="w-full max-w-2xl">
            <div class="border rounded-lg border pb-6 border-gray-200">
              <div class="flex items-center border-b border-gray-200 justify-between px-6 py-3">
                <p tabindex="0" class="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800">Votre équipe</p>
              </div>
              <div class="px-6 pt-6 overflow-x-auto">
                <table class="w-full whitespace-nowrap">
                  <tbody>
                  <tr tabindex="0" class="focus:outline-none" v-for="(monster, index) in pokedex.list" :key="index">
                    <td>
                      <div class="flex items-center">
                        <div class="bg-gray-100 rounded-sm p-2.5">
                          <img :data-src="monster.sprite" :alt="monster.name" v-lazy-load/>
                        </div>
                        <div class="pl-3">
                          <div class="flex items-center text-sm leading-none">
                            <p class="font-semibold text-gray-800">{{ monster.name }}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="pl-16">
                      <div>
                        <div class="flex items-center justify-center px-2 py-1 mt-2 ">
                          <button @click="remove(index)" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Supprimer</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                  <div v-if="pokedex.list.length === 0">
                    <p>Vous n'avez pas encore d'equipe.</p>
                    <p>Utilisez le formulaire suivant pour restaurer une sauvegarde</p>
                    <div class="pt-4 flex justify-center">
                      <div class="mb-3 w-96">
                        <input @change="fileChange" class="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file">
                      </div>
                    </div>
                  </div>
                </table>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a v-if="pokedex.list.length > 0" @click="backup()" :href="url" :download="filename" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Exporter</a>
            <button @click="$emit('close-modal')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { usePokedex } from '~/store/pokedex'

export default Vue.extend({
  name: 'Team',
  data () {
    return {
      isLoading: false,
      visible: false,
      monster: {},
      url: '#',
      filename: '',
      pokedex: usePokedex()
    }
  },
  methods: {
    remove(index: number): void {
      this.pokedex.remove(index)
    },
    backup(): void {
      const jsonData = encodeURIComponent(JSON.stringify(this.pokedex.list))
      this.url = `data:text/plain;charset=utf-8,${jsonData}`
      this.filename = 'pokedex.json'
    },
    async fileChange(e: any): Promise<void> {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) { return; }

      const reader: any = new FileReader()
      reader.onload = (e: any) => this.pokedex.backup(JSON.parse(e.target!.result));
      reader.readAsText(files[0])
    },
  }
})
</script>
