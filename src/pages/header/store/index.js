import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  appCont: '1',
  name: 'test',
  testAction: 0
}
const getters = {
  test: (state) => {
    const params = {
      a: state.appCont,
      b: state.name
    }
    return params
  }
}
const mutations = {
  SET_APPCONT(state, item) {
    state.appCont = item
  },
  SET_ACTION(state, item) {
    state.testAction = item
  }
}

const actions = {
  async setAction({commit}) {
    commit('SET_ACTION', await setTest())
  }
}

function setTest() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('hello word')
    }, 2000)
  })
}

export default new vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})