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
      isNewConnectionFormVisible: false,
      previousConnectionsList: []
    }
  },
  methods: {
    ...mapActions(['connect', 'setDatabase', 'setCollection']),
    async doConnect() {
      var vm = this
      var valObj = this.previousConnectionsList.filter(function(conn) {
        if (conn.connectionName === vm.name) return conn.connectionName
      })

      if (!valObj.length)
        vm.previousConnectionsList.push({ connectionName: vm.name, connectionString: vm.connectionString })

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
      button(@click="isNewConnectionFormVisible = !isNewConnectionFormVisible").round.add {{ isNewConnectionFormVisible ? '-' : '+' }}
    form(v-if="isNewConnectionFormVisible") 
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
  .box
    h1 Previous Connections 
    .collection(v-for="collection in previousConnectionsList")
      p {{collection.connectionName}}   {{collection.connectionString}}

</template>

<style scoped lang="scss">
.collection {
  cursor: pointer;
  color: var(--fg-dim-color);
  transition: var(--transition);
}
.collection:hover {
  color: var(--fg-color);
}
</style>
