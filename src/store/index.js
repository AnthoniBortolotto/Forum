import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     Postagems: [],
     regrasMsg: [
       v => v == '' || 'A mensagem é obrigatória',
       v => /[^a-z0-9 A-Zãâõêç.,]+/.test(v) || 'Não é permitido caracteres especiais',
       v => v.length <= 3 || 'A mensagem deve ter mais de 3 caracteres',
       v => v.length >= 200 || 'A mensagem deve ter menos de 200 caracteres'
     ]
  },
  mutations: {
    addPostagem (state, payload){
      state.Postagems.push(payload)
    }
  },
  actions: {},
  modules: {},
});
