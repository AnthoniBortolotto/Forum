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
    },
    tituloRepetido (state, payload){
      if(state.Postagems.length === 0) return false
      state.Postagems.map(post =>{ if(post.titulo === payload) return true})
      return false
    }
  },
  actions: {},
  modules: {},
});
