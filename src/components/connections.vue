<script>
const connectionName = 'localhost'
const connectionString = `mongodb://localhost:27017`

import { mapActions, mapState } from 'vuex'

export default {
  name: 'connections',
  data() {
    return {
      name: connectionName,
      connectionString
    }
  },
  methods: {
    ...mapActions(['connect', 'setDatabase', 'setCollection']),
    async doConnect() {
      await this.connect(this.connectionString)
      this.$router.push('/connection')
    }
  },
  computed: {
    ...mapState(['databases', 'collections'])
  }
}
</script>

<template lang="pug">
.connections
  .box
    h1
      span Connections
      button.round.add +
    form
      .form-item
        p Connection name:
        input(type="text" v-model="name")
      .form-item
        p Connection string:
        input(type="text" v-model="connectionString")
      button(type="button" @click="doConnect") Connect
  .box
    h1 Databases
    .database(v-for="database in databases" @click="setDatabase(database.name)")
      p {{database.name}}
  .box
    h1 Collections
    .collection(v-for="collection in collections" @click="setCollection(collection.name)")
      p {{collection.name}}

</template>

<style scoped lang="scss"></style>
