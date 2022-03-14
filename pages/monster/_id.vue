<template>
  <div>
  <Profile :monster-name="id" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Profile from '../../components/Profile.vue'

export default Vue.extend({
  name: 'ProfilePage',
  components: { Profile },
  async asyncData({ params }): Promise<any> {
    const id = params.id; // When calling /abc the slug will be "abc"
    return { id };
  },
})
</script>
