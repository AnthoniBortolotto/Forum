<template>
  <div class="adicionar">
    <v-form v-model="valid">
      <v-container>
        <v-col>
          <v-text-field
            v-model="titulo"
            :rules="regrasTitulo"
            :counter="20"
            label="Título"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-textarea
            rows="4"
            auto-grow
            outlined
            v-model="mensagem"
            :rules="regrasMsg"
            :counter="500"
            label="Mensagem"
            required
          ></v-textarea>
        </v-col>
        <v-col>
          <v-btn v-on:click="handlerClick()" color="accent" :disabled="!valid"
            >Adicionar</v-btn
          >
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Vue from "vue";
import Postagem from "../atoms/Postagem";
import store from "../store/index";
import { handlerAuth } from "../plugins/auth";
//import Postagem from "../atoms/Postagem";
export default Vue.extend({
  name: "Home",
  components: {},
  data: function () {
    return {
      valid: false,
      autor: String,
      mensagem: String,
      titulo: String,
      titulos: Array,
      regrasMsg: [
        (v) => !!v || "A mensagem é obrigatória",
        (v) => v.length > 3 || "A mensagem deve ter mais de 3 caracteres",
        (v) => v.length < 201 || "A mensagem deve ter menos de 201 caracteres",
        (v) =>
          !/[^a-z0-9 A-Zãâõêáéíóúàç.,:;?!]+/.test(v) ||
          "Não é permitido caracteres especiais",
      ],
      regrasTitulo: Array,
    };
  },
  beforeMount() {
    handlerAuth((error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("logedin");
      this.$router.push("/private");
    });
  },
  created() {
    if (!store.state.logado)
      window.location.replace("http://localhost:8080/conta");
    let t = [];
    this.titulo = "";
    this.mensagem = "";
    store.state.Postagens.map((post) => {
      t.push(post.titulo);
    });
    this.titulos = t;
    this.regrasTitulo = [
      (v) => !!v || "O titulo é obrigatório",
      (v) =>
        !/[^a-z0-9 A-Zãâõêáéíóúàç.,:;?!]+/.test(v) ||
        "Não é permitido caracteres especiais",
      (v) => v.length < 21 || "O titulo deve ter menos de 21 caracteres",
      (v) =>
        this.titulos.indexOf(v) == -1 ||
        "Já existe uma postagem com esse título",
    ];
  },
  methods: {
    checarTitulo(titulo) {
      return store.getters.tituloRepetido(titulo);
    },
    handlerClick() {
      this.$router.push({ path: "/" });
      store.commit(
        "addPostagem",
        new Postagem("Paulo", this.titulo, this.mensagem)
      );
      this.titulo = "";
      this.mensagem = "";
      store.commit("mudarAba", 0);
    },
  },
});
</script>

<style></style>
