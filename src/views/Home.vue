<template lang="pug">
  .home
    Connections(msg="Welcome to Your Vue.js App")
</template>

<script>
import Connections from '@/components/connections.vue'

export default {
  name: 'Home',
  components: {
    Connections
  }
}
</script>
