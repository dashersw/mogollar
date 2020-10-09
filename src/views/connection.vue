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
    ...mapState([
      'openedCollections',
      'collectionName',
      'databaseName',
      'activeRecords',
      'collectionRecords',
      'totalNumberOfResults'
    ])
  },
  watch: {
    collectionName: function(newValue) {
      if (this.collectionRecords[newValue]) {
        this.queryJson = this.collectionRecords[newValue].query
      } else {
        this.queryJson = '{}'
      }
    }
  },
  methods: {
    ...mapActions(['find', 'setCollection', 'removeCollectionFromOpenedCollections']),
    async doQuery() {
      if (!this.queryJson) {
        this.queryJson = '{}'
      }
      await this.find(JSON.parse(this.queryJson))
    }
  }
}
</script>
<template lang="pug">
.connections(v-if='databaseName')
  h1 {{ databaseName }}
  .box(v-if='!openedCollections.length')
    p.colletion-errorPlease Please, select at least one collection at the left sidebar
  .connection-tabs(v-if='openedCollections.length > 0')
    .connection-tab(
      v-for='collectionTabName in openedCollections',
      :class='{ selected: collectionTabName === collectionName ? true : false }'
    )
      span.tab-label(@click='setCollection(collectionTabName)') {{ collectionTabName }}
      span.close-btn(@click='removeCollectionFromOpenedCollections(collectionTabName)') x
  .connection(v-for='collectiontab in openedCollections', v-if='collectiontab === collectionName')
    .box(v-if='activeRecords')
      form
        .form-item
          h2 Query
        .form-item
          input.code(type='text', v-model='queryJson')
        button(type='button', @click='doQuery') Run query
    .box.records-holder
      h2 Records
      .box.records
        .record-views
          .record-row(v-for='record in activeRecords.result')
            json-viewer(:value='record', theme='jv-dark')
          .no-record(v-if='activeRecords.isEmpty') There is no record on this collection
          .first-record(v-if='totalNumberOfResults === null') Please run a query
      .query-total-results
        p(v-if='totalNumberOfResults') Total Results: {{ totalNumberOfResults }}
</template>

<style lang="scss" scoped>
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
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 4px;
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
  overflow: auto;
}
</style>

<style lang="scss"></style>
