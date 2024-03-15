<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Connection',
  data() {
    return {
      queryJson: '{}'
    }
  },
  computed: {
    ...mapState(['collectionName', 'databaseName', 'records', 'totalNumberOfResults'])
  },
  methods: {
    ...mapActions(['find']),
    async doQuery() {
      await this.find(JSON.parse(this.queryJson))
    }
  }
}
</script>
<template lang="pug">
div.connection
  h1 {{ databaseName }} - {{ collectionName }} collection
  .box
    form
      .form-item
        h2 Query:
      .form-item
        input.code(type="text" v-model="queryJson")
      button(type="button" @click="doQuery") Run query
  .box.records
    h1 Records
    .record-views
      json-viewer(v-for="record in records" :value="record" theme="jv-dark")
  div.query-total-results
    p(v-if="totalNumberOfResults != null") Total Results: {{totalNumberOfResults}}
</template>

<style lang="scss" scoped>
.connection {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
}

.query-total-results {
  height: 1.4rem;
  bottom: 1rem;
  font-size: 1rem;
}

.records {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.record-views {
  flex-grow: 1;
  height: 200px;
  overflow: scroll;
}
</style>

<style lang="scss"></style>
