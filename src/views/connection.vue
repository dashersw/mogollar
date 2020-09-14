<script>
import { mapActions, mapState } from 'vuex'
import records from '../components/records'

export default {
  name: 'Connection',
  data() {
    return {
      queryJson: '{}'
    }
  },
  components: { records },
  computed: {
    ...mapState(['collectionName', 'databaseName', 'records', 'totalNumberOfResults'])
  },
  methods: {
    ...mapActions(['find', 'deleteDocument']),
    async doQuery() {
      await this.find(JSON.parse(this.queryJson))
    },
    async deleteRecord(record) {
      await this.deleteDocument(record._id)
      const index = this.records.indexOf(record)
      this.records.splice(index, 1)
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
      div(v-bind:class="[records.length > 0 ? 'record-root-border' : '', 'record-container']")
        records(:records="records" :showModal="false" @deleteRecord="deleteRecord") 
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

.record-container {
  overflow-y: scroll;
  position: absolute;
  bottom: 20px;
  top: 80px;
  left: 1rem;
  right: 1rem;
}

.record-root-border {
  border: 1px solid #777;
}
</style>
