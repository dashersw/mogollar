import Vue from 'vue'
import Vuex from 'vuex'
const mongoose = require('mongoose')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: null,
    collections: [],
    records: [],
    collectionName: ''
  },
  mutations: {},
  actions: {
    async connect({ state, dispatch }, connectionString) {
      await mongoose.connect(connectionString)
      state.connection = mongoose.connection
      await dispatch('getCollections')
    },
    async getCollections({ state }) {
      state.collections = await state.connection.db.listCollections().toArray()
    },
    async find({ state }, query = {}) {
      const collection = state.connection.db.collection(state.collectionName)
      state.records = await collection.find(query).toArray()
    },
    async setCollection({ state }, collectionName) {
      state.collectionName = collectionName
    }
  },
  modules: {}
})
