import Vue from "vue";
import Vuex from "vuex";
import Postagem from "../atoms/Postagem";
import Conta from "../atoms/Conta";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessoesAtivas: [],
    Postagens: [new Postagem("Anthoni", "Bom dia", "Teremos um bom dia hoje")],
    Contas: [new Conta("Ana", "p", "an")],
    abaAtiva: Number,
    logado: false,
    abas: [
      {
        nome: "Home",
        rota: "/",
      },
      {
        nome: "Adicionar",
        rota: "/adicionar",
      },
      {
        nome: "Conta",
        rota: "/conta",
      },
    ],
  },

  mutations: {
    addPostagem(state, payload) {
      state.Postagens.push(payload);
    },

    mudarAba(state, payload) {
      state.abaAtiva = payload;
    },
    checarLogin(state, payload) {
      console.log(
        payload !== null && state.sessoesAtivas.includes(payload) === true
      );
      if (payload !== null && state.sessoesAtivas.includes(payload) === true)
        state.logado = true;
      else state.logado = false;
    },
    adicionarSessao(state, payload) {
      state.sessoesAtivas.push(payload);
    },
  },
  getters: {
    teste: () => (linha) => {
      return linha;
    },
    checarSessaoAtiva: (state) => (payload) => {
      if (state.sessoesAtivas.length === 0) return false;
      return state.sessoesAtivas.includes(payload);
    },
    checarCampoConta: (state) => (email, senha) => {
      let conta;
      for (let i = 0; i < state.Contas.length; i++) {
        conta = state.Contas[i];
        if (conta.email === email && conta.password === senha) {
          return conta;
        }
        conta = undefined;
      }
      //console.log(conta);
      return undefined;
    },
    tituloRepetido: (state) => (payload) => {
      if (state.Postagens.length === 0) {
        return true;
      }
      state.Postagens.map((post) => {
        if (post.titulo === payload) return false;
      });
      return true;
    },
  },
  actions: {},
  modules: {},
});
