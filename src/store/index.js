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
    collections: [],
    collectionRecords: {},
    queryJson: '{}',
    activeRecords: null,
    collectionName: '',
    lastOpenedCollection: '',
    openedCollections: [],
    totalNumberOfResults: null
  },
  mutations: {},
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
      if (state.collectionRecords[state.collectionName]) {
        const query_serialization = JSON.stringify(query)

        if (state.collectionRecords[state.collectionName].query === query_serialization) {
          state.activeRecords = state.collectionRecords[state.collectionName]
          state.totalNumberOfResults = state.activeRecords.result.length
          return
        }
      }

      state.totalNumberOfResult = null
      const collection = state.connection.db.collection(state.collectionName)
      const cursor = await collection.find(query)

      cursor.count((err, result) => {
        if (err) return
        state.totalNumberOfResults = result
      })

      const result = await cursor.toArray()

      state.activeRecords = {
        query: JSON.stringify(query),
        result,
        isEmpty: !result.length
      }

      state.collectionRecords[state.collectionName] = state.activeRecords
    },
    async setDatabase({ state, dispatch }, databaseName) {
      state.connection = state.connection.useDb(databaseName)
      state.databaseName = databaseName
      state.collectionName = ''
      state.collectionRecords = {}
      state.openedCollections = []
      await dispatch('getCollections')
    },
    async setCollection({ state }, collectionName) {
      state.collectionName = collectionName
      state.lastOpenedCollection = collectionName

      if (state.collectionRecords[state.collectionName]) {
        state.activeRecords = state.collectionRecords[state.collectionName]
        state.totalNumberOfResults = state.activeRecords.result.length
      } else {
        state.activeRecords = []
        state.totalNumberOfResults = null
      }
    },
    async addCollectionToOpenedCollections({ state, dispatch }, collectionName) {
      if (state.openedCollections.includes(collectionName)) {
        return false
      }

      state.openedCollections.push(collectionName)
      await dispatch('setCollection', collectionName)
    },
    async removeCollectionFromOpenedCollections({ state, dispatch }, collectionName) {
      if (state.openedCollections.includes(collectionName)) {
        state.openedCollections = state.openedCollections.filter(itemName => itemName !== collectionName)

        //clear saved query records
        delete state.collectionRecords[collectionName]

        if (state.lastOpenedCollection === collectionName) {
          await dispatch('setCollection', state.openedCollections[state.openedCollections.length - 1])
        } else {
          await dispatch('setCollection', state.lastOpenedCollection)
        }
      }
    }
  },
  modules: {}
})
