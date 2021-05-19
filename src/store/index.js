import Vue from "vue";
import Vuex from "vuex";
import Postagem from "../atoms/Postagem";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Postagens: [new Postagem("Anthoni", "Bom dia", "Teremos um bom dia hoje")],
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
    tituloRepetido(state, payload) {
      if (state.Postagens.length === 0) {
        return true;
      }
      state.Postagens.map((post) => {
        if (post.titulo === payload) return false;
      });
      return true;
    },
    mudarAba(state, payload) {
      state.abaAtiva = payload;
    },
    checarLogin(state, payload) {
      if (payload !== null) state.logado = true;
      else state.logado = false;
    },
  },
  actions: {},
  modules: {},
});
