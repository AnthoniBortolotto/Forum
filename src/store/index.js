import Vue from "vue";
import Vuex from "vuex";
import Postagem from "../atoms/Postagem";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Postagens: [ new Postagem("Anthoni", "Bom dia", "Teremos um bom dia hoje")],
  },
  mutations: {
    addPostagem(state, payload) {
      state.Postagens.push(payload);
    },
    tituloRepetido(state, payload) { //Corrigir
      if (state.Postagens.length === 0){
        console.log('conjunto vazio');
        return true;
      }
      state.Postagens.map(post =>{ if (post.titulo === payload) return false})
      console.log('Não foi encontrado');
      return true;
    },
    // getters: {
    //   getTitulos: state => {
    //      if(state.Postagens == []) return [];
    //      let titulos = []
    //      state.Postagens.map(valor =>{
    //        titulos.push(valor.titulo)
    //      })
    //      return titulos
    //   }
    // }
  },
  actions: {},
  modules: {},
});
