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
    records: [],
    collectionName: '',
    totalNumberOfResults: null,
    recordList: []
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
      state.totalNumberOfResults = null
      const collection = state.connection.db.collection(state.collectionName)
      const cursor = await collection.find(query)
      cursor.count((err, result) => {
        if (err) return

        state.totalNumberOfResults = result
      })
      state.records = await cursor.toArray()
    },
    async setDatabase({ state, dispatch }, databaseName) {
      state.connection = state.connection.useDb(databaseName)
      state.databaseName = databaseName
      state.collectionName = ''
      state.records = []
      await dispatch('getCollections')
    },
    async setCollection({ state }, collectionName) {
      state.collectionName = collectionName
    },
    async deleteDocument({ state }, id) {
      const collection = state.connection.db.collection(state.collectionName)
      await collection.deleteOne({ _id: id })
    }
  },
  modules: {}
})
