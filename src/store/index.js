/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import Postagem from "../atoms/Postagem";
import Conta from "../atoms/Conta";
import auth0 from "auth0-js";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessoesAtivas: [],
    auth0: new auth0.WebAuth({
      domain: "dev-br9dmv51.us.auth0.com",
      clientID: "ESUQyTTDNpczBHze0dTRkFjzNjyAcsty",
      redirectUri: "https://localhost:8080/", //callback
      responseType: "token id_token",
      scope: "openid profile",
    }),
    Postagens: [
      new Postagem("Anthoni", 2, "Bom dia", "Teremos um bom dia hoje"),
    ],
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
    setAuthorization(state, payload) {
      state.logado = payload;
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
    atualizarContas(state) {},
    atualizarSessao(state) {},
    atualizarPostagens(state) {},
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
  actions: {
    auth0Login(context) {
      context.state.auth0.authorize();
    },
    auth0Authentication(context) {
      context.state.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          );
          localStorage.setItem("access_token", authResult.accessToken);
          localStorage.setItem("id_token", authResult.idToken);
          localStorage.setItem("expires_at", expiresAt);

          router.replace("/");
        } else if (err) {
          alert("login failed. Error ");
          router.replace("/conta");
          console.log(err);
        }
      });
    },
  },
  modules: {},
});
