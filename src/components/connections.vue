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
      isNewConnectionFormVisible: false
    }
  },
  methods: {
    ...mapActions([
      'connect',
      'setDatabase',
      'setCollection',
      'lastOpenedCollection',
      'addCollectionToOpenedCollections'
    ]),
    async doConnect() {
      await this.connect(this.connectionString)
      this.$router.push('/connection')
    },
    setSelectedDBorCollection(sourceType = 'db', sourceName) {
      if (sourceType === 'db') {
        if (this.databaseName == sourceName) {
          return false
        }

        this.setDatabase(sourceName)
      } else {
        if (this.collectionName == sourceName) {
          return false
        }

        if (this.openedCollections.includes(sourceName)) {
          this.setCollection(sourceName)
        } else {
          this.addCollectionToOpenedCollections(sourceName)
        }
      }
    }
  },
  computed: {
    ...mapState(['databases', 'collections', 'collectionName', 'databaseName', 'openedCollections'])
  }
}
</script>

<template lang="pug">
.connections
  .box
    h1
      span Connections
      button.round.add(@click='isNewConnectionFormVisible = !isNewConnectionFormVisible') {{ isNewConnectionFormVisible ? "-" : "+" }}
    form(v-if='isNewConnectionFormVisible')
      .form-item
        p Connection name:
        input(type='text', v-model='name')
      .form-item
        p Connection string:
        input(type='text', v-model='connectionString')
      button(type='button', @click='doConnect') Connect
  .box
    h1 Databases
    .box-item(
      v-for='database in databases',
      @click='setSelectedDBorCollection("db", database.name)',
      :class='{ selected: database.name === databaseName ? true : false }'
    )
      p {{ database.name }}
  .box
    h1 Collections
    .box-item(
      v-for='collection in collections',
      @click='setSelectedDBorCollection("collection", collection.name)',
      :class='{ selected: collection.name === collectionName ? true : false }'
    )
      p {{ collection.name }}
</template>

<style scoped lang="scss">
.box-item {
  cursor: pointer;
  color: var(--fg-dim-color);
  transition: var(--transition);
  &:hover {
    color: var(--fg-color);
  }
  &.selected {
    cursor: default;
    color: var(--fg-color);
  }
}
</style>
