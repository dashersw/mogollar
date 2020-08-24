import Vue from 'vue'
import Vuex from 'vuex'
const mongoose = require('mongoose')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: null,
    collections: [],
    records: [],
    collectionName: '',
    totalNumberOfResults: null
  },
  mutations: {},
  actions: {
    async connect({ state, dispatch }, connectionString) {
      await mongoose.connect(connectionString, {useNewUrlParser: true})
      state.connection = mongoose.connection
      await dispatch('getCollections')
    },
    async getCollections({ state }) {
      state.collections = await state.connection.db.listCollections().toArray()
    },
    async find({ state }, query = {}) {
      state.totalNumberOfResults = null
      const collection = state.connection.db.collection(state.collectionName)
      const cursor = await collection.find(query)
      cursor.count((err,result) => {
        if (err) return

        state.totalNumberOfResults = result
      })
      state.records = await cursor.toArray()
    },
    async setCollection({ state }, collectionName) {
      state.collectionName = collectionName
    }
  },
  modules: {}
})
