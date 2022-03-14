<template>
  <div>
    Nothing here...
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MonsterIndex',
  beforeMount(): void {
      this.$nuxt.$options.router!.push('/');
  },
})
</script>
