<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Connection',
  computed: {
    ...mapState(['openedCollections', 'collectionName', 'databaseName', 'collectionRecords']),
    queryJson: {
      get() {
        return this.$store.state.queryJson
      },
      set(value) {
        this.$store.commit('updateQuery', value)
      }
    }
  },
  methods: {
    ...mapActions(['find', 'setCollection', 'closeCollection', 'switchTab']),
    async doQuery() {
      await this.find(JSON.parse(this.queryJson))
    },
    queryChange(value) {
      this.queryJson = value
    }
  }
}
</script>
<template lang="pug">
.connections(v-if='!databaseName')
  h1 Welcome!
  .box
    p.colletion-error Please, connect your database first.
.connections(v-else)
  h1 {{ databaseName }}
  .box(v-if='!openedCollections.length')
    p.colletion-error Please, select at least one collection.
  .connection-tabs(v-else)
    .connection-tab(
      v-for='collectionTabName in openedCollections',
      :class='{ selected: collectionTabName === collectionName }'
    )
      span.tab-label(@click='switchTab(collectionTabName)') {{ collectionTabName }}
      span.close-btn(@click='closeCollection(collectionTabName)') &cross;
  .connection(v-for='collectionTab in openedCollections', v-if='collectionTab === collectionName')
    .box
      form
        .form-item
          h2 Query
        .form-item
          input.code(type='text', v-model='queryJson')
        button(type='button', @click='doQuery') Run query
    .box.records-holder
      h2 Records
      .box.records
        .record-views(v-if='collectionRecords[collectionName].results.length')
          .record-row(v-for='(result, index) in collectionRecords[collectionName].results' :key="index")
            json-viewer(:value='result', theme='jv-dark')
        .no-record(v-if='!collectionRecords[collectionName].firstQuery && !collectionRecords[collectionName].results.length') There are no records in this collection.
        .first-query(v-if='collectionRecords[collectionName].firstQuery') Please run a query
      .query-total-results
        p(v-if='collectionRecords[collectionName].results.length') Total Results: {{ collectionRecords[collectionName].results.length }}
</template>

<style lang="scss" scoped>
.box.records {
  margin: 1rem 0;
}
.connections {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
}
.connection-tabs {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-color);
  padding: 0 8px;
  margin-bottom: 2rem;
}
.connection-tab {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  margin-right: 0.25rem;
  word-wrap: none;
  white-space: nowrap;
  background: var(--button-bg);
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  display: flex;
  &.selected {
    background: var(--box-bg);
  }
  &:last-of-type {
    margin: 0;
  }

  .tab-label {
    padding: 12px;
  }
  .close-btn {
    display: block;
    border-radius: 12px;
    width: 18px;
    height: 18px;
    margin-right: 6px;
    background: var(--bg-color);
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: var(--button-hover-bg);
      color: var(--fg-color);
    }
  }
}

.connection {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.records-holder {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.query-total-results {
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
  overflow: auto;
}
</style>

<style lang="scss"></style>
