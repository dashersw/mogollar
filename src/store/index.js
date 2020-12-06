import Vue from 'vue'
import Vuex from 'vuex'
const mongoose = require('mongoose')
const Admin = mongoose.mongo.Admin

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: null,
    databases: [],
    databaseName: '',
    queryJson: '{}',
    collections: [],
    collectionRecords: {},
    collectionName: '',
    lastOpenedCollection: '',
    openedCollections: []
  },
  mutations: {
    updateQuery(state, query) {
      state.queryJson = query
    }
  },
  actions: {
    async connect({ state, dispatch }, connectionString) {
      await mongoose.connect(connectionString, { useNewUrlParser: true })
      state.connection = mongoose.connection
      await dispatch('getDatabases')
    },
    async getDatabases({ state }) {
      try {
        let databaseList = await new Admin(state.connection.db).listDatabases()
        state.databases = databaseList.databases
      } catch (e) {
        console.log(e)
      }
    },
    async getCollections({ state }) {
      state.collections = await state.connection.db.listCollections().toArray()
    },
    async find({ state }, query = {}) {
      if (
        state.collectionRecords[state.collectionName].query === JSON.stringify(query) &&
        !state.collectionRecords[state.collectionName].firstQuery
      ) {
        return false
      }

      const collection = state.connection.db.collection(state.collectionName)
      const cursor = await collection.find(query)

      cursor.count(err => {
        if (err) return
      })

      const results = await cursor.toArray()

      state.collectionRecords = {
        ...state.collectionRecords,
        [state.collectionName]: {
          query: JSON.stringify(query),
          results
        }
      }
    },
    async setDatabase({ state, dispatch }, databaseName) {
      if (state.databaseName == databaseName) {
        return false
      }

      state.connection = state.connection.useDb(databaseName)
      state.databaseName = databaseName
      state.collectionName = ''
      state.collectionRecords = {}
      state.openedCollections = []
      await dispatch('getCollections')
    },
    async setCollection({ state }, collectionName) {
      if (state.openedCollections.includes(collectionName)) {
        return
      }

      state.collectionName = collectionName
      state.lastOpenedCollection = collectionName
      state.openedCollections.push(collectionName)

      state.collectionRecords = {
        ...state.collectionRecords,
        [state.collectionName]: {
          query: '{}',
          firstQuery: true,
          results: []
        }
      }
      state.queryJson = state.collectionRecords[state.collectionName].query
    },
    async closeCollection({ state, dispatch }, collectionName) {
      if (!state.openedCollections.includes(collectionName)) {
        return false
      }

      state.openedCollections = state.openedCollections.filter(itemName => itemName !== collectionName)
      delete state.collectionRecords[collectionName]

      if (!state.openedCollections.length) {
        state.collectionName = ''
        state.lastOpenedCollection = ''
        return
      }

      dispatch(
        'switchTab',
        state.lastOpenedCollection === collectionName
          ? state.openedCollections[state.openedCollections.length - 1]
          : state.lastOpenedCollection
      )
    },
    switchTab({ state }, collectionName) {
      state.collectionName = collectionName
      state.lastOpenedCollection = collectionName
      state.queryJson = state.collectionRecords[state.collectionName].query
    }
  },
  modules: {}
})
