import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import path from './modules/path.js'
import order from './modules/order.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    path,
    order
  }
})
