<script>
const connectionName = 'localhost'
const connectionString = `mongodb://localhost:27017`

import { mapActions, mapState } from 'vuex'

export default {
  name: 'connections',
  data() {
    return {
      name: connectionName,
      connectionString,
      showConnections: true
    }
  },
  methods: {
    ...mapActions(['connect', 'setCollection']),
    async doConnect() {
      await this.connect(this.connectionString)
      this.$router.push('/connection')
    },
    toggleConnections() {
      this.showConnections = !this.showConnections
    }
  },
  computed: {
    ...mapState(['collections'])
  }
}
</script>

<template lang="pug">
.connections
  .box
    h1
      span Connections
      button(@click="toggleConnections").round.add +
    form(v-show="showConnections")
      .form-item
        p Connection name:
        input(type="text" v-model="name")
      .form-item
        p Connection string:
        input(type="text" v-model="connectionString")
      button(@click="doConnect") Connect
  .box
    h1 Collections
    .collection(v-for="collection in collections" @click="setCollection(collection.name)")
      p {{collection.name}}

</template>

<style scoped lang="scss"></style>
