import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     Postagems: []
  },
  mutations: {
    addPostagem (state, payload){
      state.Postagems.push(payload)
    }
  },
  actions: {},
  modules: {},
});
