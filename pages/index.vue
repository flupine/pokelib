<template>
  <div>
    <List />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import List from '../components/List.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { List }
})
</script>
