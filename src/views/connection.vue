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
    ...mapState(['collectionName', 'records'])
  },
  methods: {
    ...mapActions(['find']),
    doQuery() {
      this.find(JSON.parse(this.queryJson))
    }
  }
}
</script>
<template lang="pug">
  div.connection
    h1 {{ collectionName }} collection
    .box
      form
        .form-item
          h2 Query:
        .form-item
          input.code(type="text" v-model="queryJson")
        button(@click="doQuery") Run query
    .box.records
      h1 Records
      .record-views
        json-viewer(v-for="record in records" :value="record" theme="jv-dark")
</template>

<style lang="scss" scoped>
.connection {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
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
